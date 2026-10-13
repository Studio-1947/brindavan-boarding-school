import Link from 'next/link';
import { CurrentYear } from './CurrentYear';

export function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <Link className="brand" href="/" prefetch={false}>
            <img className="logo" src="/assets/logo.png" alt="Brindavan Boarding School crest" />
            <span className="brand-name">
              Brindavan<span>Boarding School</span>
            </span>
          </Link>
          <p>
            Learn with curiosity.
            <br />
            Grow with purpose.
          </p>
          <a href="#main" className="text-link">
            Back to top{' '}
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
        </div>
        <div className="footer-col">
          <h4>EXPLORE</h4>
          <Link href="/about">About the School</Link>
          <Link href="/academics">Academics</Link>
          <Link href="/boarding">Boarding life</Link>
          <Link href="/life">Beyond class</Link>
          <Link href="/admissions">Admissions</Link>
        </div>
        <div className="footer-col footer-social">
          <h4>CONNECT</h4>
          <address>
            Brindavan Boarding School
            <br />
            Seeyok Fatak, Mirik
            <br />
            Darjeeling, West Bengal · 734214
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
        <div className="footer-col">
          <h4>FIND US</h4>
          <a
            className="footer-map"
            href="https://www.google.com/maps/search/?api=1&amp;query=Brindavan+Boarding+School+Seeyok+Fatak+Mirik"
            target="_blank"
            rel="noopener"
          >
            <svg viewBox="0 0 220 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path
                d="M4 42C48 22 78 57 118 37C150 22 180 47 216 32"
                stroke="currentColor"
                strokeWidth="1"
                strokeOpacity=".45"
              />
              <path
                d="M10 118C53 93 83 113 116 88C148 66 183 98 210 76"
                stroke="currentColor"
                strokeWidth="1"
                strokeOpacity=".45"
              />
              <path d="M58 8C58 52 28 72 28 108" stroke="currentColor" strokeWidth="1" strokeOpacity=".3" />
              <path
                d="M168 12C168 48 193 62 193 102"
                stroke="currentColor"
                strokeWidth="1"
                strokeOpacity=".3"
              />
              <path
                d="M110 38C123 38 133 48 133 61C133 80 110 110 110 110C110 110 87 80 87 61C87 48 97 38 110 38Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="110" cy="61" r="6" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span>Open in Google Maps</span>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © <CurrentYear /> Brindavan Boarding School
        </span>
        <span>
          Website Designed by :{' '}
          <a className="credit-link" href="https://www.1947.io" target="_blank" rel="noopener">
            Studio 1947
          </a>
        </span>
      </div>
    </footer>
  );
}
