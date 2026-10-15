'use client';

import Link from 'next/link';
import { CurrentYear } from './CurrentYear';
import { FooterMap } from './FooterMap';
import { SwooshArrow } from './icons';
import { ProspectusButton } from './Prospectus';
import { localizeHref } from '@/i18n/lang';
import { useLang, useT } from '@/i18n/ui';

export function Footer() {
  const lang = useLang();
  const t = useT();
  const href = (path: string) => localizeHref(path, lang);
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <Link className="brand" href={href('/')} prefetch={false}>
            <img className="logo" src="/assets/logo.png" alt={t('Brindavan Boarding School crest')} />
            <span className="brand-name">
              {t('Brindavan')}
              <span>{t('Boarding School')}</span>
            </span>
          </Link>
          <p className="footer-motto">
            {t('Love All,')}
            <br />
            {t('Serve All.')}
          </p>
          <a href="#main" className="text-link">
            {t('Back to top')}{' '}
            <svg
              className="icon-arrow"
              width="13"
              height="13"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M7 10V4M7 4L4 7M7 4L10 7"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <div className="footer-contact">
            <address>
              {t('Brindavan Boarding School')}
              <br />
              {t('Seeyok Fatak, Mirik')}
              <br />
              {t('Darjeeling, West Bengal · 734214')}
            </address>
            <a
              href="https://www.facebook.com/p/Brindavan-boarding-school-61574700620509/"
              target="_blank"
              rel="noopener"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M16 8.5h-2c-.5 0-1 .5-1 1.2V12h3l-.4 3h-2.6v7h-3v-7H8v-3h2V9.3C10 7 11.6 5 14 5h2.5v3.5Z"
                  fill="currentColor"
                />
              </svg>{' '}
              Facebook
            </a>
          </div>
        </div>
        <div className="footer-col">
          <h4>{t('EXPLORE')}</h4>
          <Link href={href('/about')}>{t('About the School')}</Link>
          <Link href={href('/academics')}>{t('Academics')}</Link>
          <Link href={href('/boarding')}>{t('Boarding life')}</Link>
          <Link href={href('/life')}>{t('Beyond class')}</Link>
          <Link href={href('/admissions')}>{t('Admissions')}</Link>
        </div>
        <div className="footer-col footer-cta">
          <div className="footer-cta-card">
            <p className="footer-cta-eyebrow">
              <span aria-hidden="true" />
              {t('ADMISSIONS 2026')}
            </p>
            <h3>
              {t('Admissions for 2026 are')} <em>{t('open.')}</em>
            </h3>
            <div className="footer-cta-actions">
              <ProspectusButton className="footer-cta-btn is-primary">
                {t('Request prospectus')}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3v12" />
                  <path d="M7 10l5 5 5-5" />
                  <path d="M5 19h14" />
                </svg>
              </ProspectusButton>
              {/* TODO(contact): placeholder. Replace +910000000000 with the school's real phone number. */}
              <a className="footer-cta-btn" href="tel:+910000000000">
                {t('Call the school')}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
                </svg>
              </a>
              <Link className="footer-cta-btn" href={href('/visit')}>
                {t('Plan a visit')}
                <SwooshArrow />
              </Link>
            </div>
          </div>
        </div>
        <div className="footer-col footer-find">
          <h4>{t('FIND US')}</h4>
          <FooterMap />
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © <CurrentYear /> {t('Brindavan Boarding School')}
        </span>
        <span>
          {t('Designed and Developed by :')}{' '}
          <a className="credit-link" href="https://www.1947.io" target="_blank" rel="noopener">
            Studio 1947
          </a>
        </span>
      </div>
    </footer>
  );
}
