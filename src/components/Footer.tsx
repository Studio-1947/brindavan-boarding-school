import Link from 'next/link';
import { CurrentYear } from './CurrentYear';
import { FooterMap } from './FooterMap';

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
        <div className="footer-col footer-find">
          <h4>FIND US</h4>
          <FooterMap />
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
