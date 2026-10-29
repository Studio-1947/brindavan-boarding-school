/* Server-side translation of a rendered page tree.

   The English pages stay the single source of layout and content. A Nepali route renders the
   same page element and passes it through localizeTree(), which walks the element tree and swaps
   every text fragment (and readable props such as alt, aria-label and data passed to client
   components) for its Nepali entry in the dictionary, and points internal links at /ne.

   Strings with no dictionary entry stay in English. Build with I18N_REPORT=1 to list them in
   .i18n-missing.txt. */

import { appendFileSync } from 'node:fs';
import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';
import type { Metadata } from 'next';
import { localizeHref, type Lang } from './lang';
import { ne, phrases } from './ne';

const CLIENT_REFERENCE = Symbol.for('react.client.reference');

/** Props that hold code-level values, never visible text. */
const SKIP = new Set([
  'className',
  'src',
  'id',
  'd',
  'viewBox',
  'fill',
  'stroke',
  'type',
  'name',
  'rel',
  'target',
  'role',
  'style',
  'width',
  'height',
  'loading',
  'key',
  'htmlFor',
  'aria-labelledby',
  'aria-controls',
  'aria-hidden',
  'fetchPriority',
  'referrerPolicy',
  'strokeLinecap',
  'strokeLinejoin',
  'xmlns',
  'hrefLang',
  'photo',
  'focus',
  'fontSize',
  'fontFamily',
  'fontWeight',
  'letterSpacing',
  'lineHeight',
  'color',
  'align',
  // text handed to the clipboard stays as written (the postal address)
  'clipboard',
]);

const upperIndex = new Map(Object.entries(ne).map(([k, v]) => [k.toUpperCase(), v.toUpperCase()]));

/** Translates one string, keeping its surrounding spaces. Unknown strings come back unchanged. */
export function translate(text: string, lang: Lang): string {
  if (lang === 'en') return text;
  const key = text.trim();
  if (!key || !/\p{L}/u.test(key)) return text;
  const hit = key in ne ? ne[key] : upperIndex.get(key);
  if (hit === undefined) {
    if (process.env.I18N_REPORT) appendFileSync('.i18n-missing.txt', JSON.stringify(key) + '\n');
    return text;
  }
  const lead = text.slice(0, text.length - text.trimStart().length);
  const tail = text.slice(text.trimEnd().length);
  return lead + hit + tail;
}

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && Object.getPrototypeOf(v) === Object.prototype;

async function translateValue(value: unknown, key: string, lang: Lang): Promise<unknown> {
  if (SKIP.has(key)) return value;
  if (typeof value === 'string') return key === 'href' ? localizeHref(value, lang) : translate(value, lang);
  if (isValidElement(value)) return localizeTree(value, lang);
  if (Array.isArray(value)) return Promise.all(value.map((v) => translateValue(v, '', lang)));
  if (isPlainObject(value)) {
    const out: Record<string, unknown> = {};
    // `name` is a code value on elements (form fields) but readable text in data, such as a person's name
    for (const [k, v] of Object.entries(value)) out[k] = await translateValue(v, k === 'name' ? '' : k, lang);
    return out;
  }
  return value;
}

/** Returns the tree with its text in the given language. */
export async function localizeTree(node: ReactNode, lang: Lang): Promise<ReactNode> {
  if (lang === 'en') return node;
  if (typeof node === 'string') return translate(node, lang);
  if (Array.isArray(node)) return Promise.all(Children.toArray(node).map((n) => localizeTree(n, lang)));
  if (!isValidElement(node)) return node;

  const element = node as ReactElement<Record<string, unknown>>;
  const { type } = element;
  const isServerComponent =
    typeof type === 'function' && (type as { $$typeof?: symbol }).$$typeof !== CLIENT_REFERENCE;

  // Server components are rendered here so their output can be translated too.
  if (isServerComponent) {
    const rendered = await (type as (p: unknown) => ReactNode | Promise<ReactNode>)(element.props);
    const localized = await localizeTree(rendered, lang);
    // Calling a server component directly does not pass React's special `key` prop.
    // Restore it on the rendered root so keyed child arrays stay keyed after translation.
    return element.key === null || !isValidElement(localized)
      ? localized
      : cloneElement(localized, { key: element.key });
  }

  const props: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(element.props)) {
    if (k === 'children') {
      const phrase = await translatePhrase(v as ReactNode, lang);
      props[k] = phrase ?? (await localizeTree(v as ReactNode, lang));
    } else props[k] = await translateValue(v, k, lang);
  }
  if (type === 'main') props.lang = lang;
  return cloneElement(element, props);
}

/*
 * Phrases: text broken up by inline elements (line breaks, highlighted words, links) is translated
 * as one sentence, so the Nepali can use its own word order. The English is written with numbered
 * tags for those elements, e.g. "How to join <1>Brindavan.</1>" or "Belonging is<1/>for life.",
 * and the Nepali places the same tags wherever they belong: "<1>वृन्दावनमा</1> कसरी भर्ना हुने?".
 */
type Part =
  { text: string } | { index: number; element: ReactElement<{ children?: ReactNode }>; inner?: string };

function serialize(children: ReactNode): { key: string; parts: Part[] } | null {
  const list = Array.isArray(children) ? children.flat(Infinity) : [children];
  const parts: Part[] = [];
  let elements = 0;
  let key = '';
  for (const child of list as ReactNode[]) {
    if (child === null || child === undefined || typeof child === 'boolean') continue;
    if (typeof child === 'string' || typeof child === 'number') {
      parts.push({ text: String(child) });
      key += String(child);
      continue;
    }
    if (!isValidElement(child)) return null;
    const el = child as ReactElement<{ children?: ReactNode }>;
    const inner = el.props.children;
    const index = ++elements;
    if (inner === undefined || inner === null) {
      parts.push({ index, element: el });
      key += `<${index}/>`;
    } else if (typeof inner === 'string') {
      parts.push({ index, element: el, inner });
      key += `<${index}>${inner}</${index}>`;
    } else return null;
  }
  // only text mixed with inline elements counts; a list of elements is translated item by item
  const hasText = parts.some((p) => 'text' in p && /\p{L}/u.test(p.text));
  if (!elements || !hasText) return null;
  return { key: key.replace(/\s+/g, ' ').trim(), parts };
}

async function translatePhrase(children: ReactNode, lang: Lang): Promise<ReactNode[] | null> {
  const found = serialize(children);
  if (!found) return null;
  const nepali = phrases[found.key];
  if (nepali === undefined) {
    if (process.env.I18N_REPORT) appendFileSync('.i18n-missing.txt', 'P:' + JSON.stringify(found.key) + '\n');
    return null;
  }
  const byIndex = new Map<number, Extract<Part, { index: number }>>();
  for (const p of found.parts) if ('index' in p) byIndex.set(p.index, p);
  const out: ReactNode[] = [];
  const pattern = /<(\d+)\/>|<(\d+)>([\s\S]*?)<\/\2>/g;
  let last = 0;
  let n = 0;
  for (let m = pattern.exec(nepali); m; m = pattern.exec(nepali)) {
    if (m.index > last) out.push(nepali.slice(last, m.index));
    const part = byIndex.get(Number(m[1] ?? m[2]));
    if (part) {
      const props: Record<string, unknown> = { key: `p${n++}` };
      for (const [k, v] of Object.entries(part.element.props)) {
        if (k !== 'children') props[k] = await translateValue(v, k, lang);
      }
      if (m[3] !== undefined) props.children = m[3];
      out.push(cloneElement(part.element, props));
    }
    last = m.index + m[0].length;
  }
  if (last < nepali.length) out.push(nepali.slice(last));
  return out;
}

/** Translates the readable parts of a page's metadata. */
export async function localizeMetadata(metadata: Metadata, lang: Lang): Promise<Metadata> {
  return (await translateValue(metadata, '', lang)) as Metadata;
}
