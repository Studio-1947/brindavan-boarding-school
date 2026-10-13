'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/** The visitor's current year, so the copyright line stays right without a rebuild. */
export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => 2026,
  );
  return <span id="year">{year}</span>;
}
