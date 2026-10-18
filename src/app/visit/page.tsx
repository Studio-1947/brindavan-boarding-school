import type { Metadata } from 'next';
import Link from 'next/link';
import { SwooshArrow } from '@/components/icons';
import { ArrivalFan, type FanPhoto } from '@/components/visit/ArrivalFan';
import { CopyAddress, VisitFind } from '@/components/visit/VisitFind';
import { VisitHero } from '@/components/visit/VisitHero';
import { VisitRoute, type RouteStop } from '@/components/visit/VisitRoute';

export const metadata: Metadata = {
  title: 'Visit & Location | Brindavan Boarding School',
  description: 'How to find and reach Brindavan Boarding School at Seeyok Fatak, Mirik, Darjeeling.',
  openGraph: {
    title: 'Visit Brindavan Boarding School',
    description: 'Your journey begins in Mirik: location and how to get here.',
    type: 'website',
  },
};

// Photos of the route that are not the school's own come from Wikimedia Commons under the
// licence named in each credit, which must stay visible next to the photo.
const COMMONS = 'https://commons.wikimedia.org/wiki/File:';

const stops: RouteStop[] = [
  {
    label: 'Bagdogra',
    tag: 'NEAREST AIRPORT',
    title: 'Bagdogra Airport',
    text: 'The nearest major airport, with onward road travel of roughly 2–3 hours to Mirik depending on traffic and route.',
    src: '/assets/visit/bagdogra-airport.webp',
    alt: 'Passengers walking across the apron at Bagdogra Airport toward a waiting plane, with hills behind',
    credit: {
      text: 'Photo: Mahafujalam6131, CC BY-SA 4.0',
      href: `${COMMONS}Bagdogra_International_Airport_with_Himalayas.jpg`,
    },
  },
  {
    label: 'NJP',
    tag: 'NEAREST RAILWAY',
    title: 'New Jalpaiguri (NJP)',
    text: 'The main railhead for the region, similarly connected to Mirik by road.',
    src: '/assets/visit/njp-station.webp',
    alt: 'The illuminated New Jalpaiguri Junction sign above the station entrance at dusk',
    credit: { text: 'Photo: Superfast1111, CC BY-SA 3.0', href: `${COMMONS}NJP_entrance.jpg` },
  },
  {
    label: 'Into the hills',
    tag: 'BY ROAD',
    title: 'From Darjeeling or Siliguri',
    text: 'Mirik is connected by hill roads to both Darjeeling town and Siliguri: confirm current travel times and routes before your visit.',
    src: '/assets/visit/mirik-hill-road.webp',
    alt: 'A hill road winding through tea gardens near Mirik, seen from Tingling View Point',
    credit: { text: 'Photo: Shubh.ch1994, CC BY-SA 4.0', href: `${COMMONS}Tingling_View_Point_Mirik.jpg` },
  },
  {
    label: 'Seeyok Fatak',
    tag: 'YOU HAVE ARRIVED',
    title: 'Seeyok Fatak, Mirik',
    text: 'The school gate at Seeyok Fatak. Arrange your visit with the school ahead of time so the admissions team can expect you.',
    src: '/assets/gate.webp',
    alt: 'The black stone gateway of Brindavan School beside the blue school buildings',
  },
];

const arrival: FanPhoto[] = [
  {
    src: '/assets/about/courtyard.webp',
    alt: 'Students playing football in the courtyard between the blue school blocks',
    caption: 'The courtyard',
  },
  {
    src: '/assets/hero/hero-5.webp',
    alt: 'Students bent over their desks drawing and colouring with crayons',
    caption: 'Classrooms',
  },
  {
    src: '/assets/gate.webp',
    alt: 'The black stone gateway of Brindavan School beside the blue school buildings',
    caption: 'The school gate',
  },
  {
    src: '/assets/about/auditorium.webp',
    alt: 'Students filling the school auditorium for an event, with teachers seated at the front',
    caption: 'The auditorium',
  },
  {
    src: '/assets/boarding/courtyard-night.webp',
    alt: 'The school courtyard at night under a starry sky, with the classroom windows lit',
    caption: 'Evenings on campus',
  },
];

export default function VisitPage() {
  return (
    <main id="main">
      <VisitHero
        front={{
          src: '/assets/visit/mirik-lake.webp',
          alt: 'Mirik town and Sumendu Lake under low cloud, with forested hills around the water',
        }}
        back={{
          src: '/assets/boarding/courtyard-blocks.webp',
          alt: 'Students playing football in the courtyard between the blue school blocks',
        }}
        behind={{
          src: '/assets/visit/mirik-tea-garden.webp',
          alt: 'Rows of tea bushes covering a hillside near Mirik, topped by a stand of tall pines',
        }}
        greeting="Greetings from Mirik"
        stamp="Darjeeling hills"
        title="Brindavan Boarding School"
        place="Seeyok Fatak, Mirik · Darjeeling, West Bengal"
        credits={[
          {
            text: 'Sumendu Lake: Sujay25, CC BY-SA 4.0',
            href: `${COMMONS}View_of_Mirik_town_with_Sumendu_lake_and_surroundings.jpg`,
          },
          { text: 'Tea garden: Animesh Kumar, CC BY-SA 4.0', href: `${COMMONS}Mirik_Tea_Garden.jpg` },
        ]}
      >
        <Link className="text-link" href="/" prefetch={false}>
          <span className="back-arrow">←</span> Back to home
        </Link>
        <p className="eyebrow">COME A LITTLE CLOSER</p>
        <h1 className="vh-title">
          Your journey
          <br />
          begins in
          <br />
          <em>Mirik.</em>
        </h1>
        <p className="lead">
          Brindavan Boarding School sits at Seeyok Fatak, in the hill town of Mirik, Darjeeling district, West
          Bengal.
        </p>
      </VisitHero>

      <VisitFind>
        <div className="vf-copy">
          <p className="eyebrow">FIND US</p>
          <h2>
            Rooted in
            <br />
            the hills of
            <br />
            <em>Mirik.</em>
          </h2>
          <address>
            Brindavan Boarding School
            <br />
            Seeyok Fatak, Mirik
            <br />
            Darjeeling, West Bengal · 734214
          </address>
          <div className="vf-actions">
            <a
              className="button orange"
              href="https://www.google.com/maps/search/?api=1&amp;query=Brindavan+Boarding+School+Seeyok+Fatak+Mirik"
              target="_blank"
              rel="noopener"
            >
              Open in Google Maps{' '}
              <span>
                <SwooshArrow />
              </span>
            </a>
            <CopyAddress clipboard="Brindavan Boarding School, Seeyok Fatak, Mirik, Darjeeling, West Bengal 734214" />
          </div>
        </div>
        <div className="location-type">
          <span>INDIA / WEST BENGAL</span>
          <figure className="vf-card">
            <img
              src="/assets/gate.webp"
              alt="The black stone gateway of Brindavan School beside the blue school buildings"
              loading="lazy"
            />
          </figure>
          <strong className="vf-place">MIRIK</strong>
          <p>
            Rooted in the hills.
            <br />
            Connected to a world of possibility.
          </p>
        </div>
      </VisitFind>

      <VisitRoute
        heading={
          <>
            <p className="eyebrow">GETTING HERE</p>
            <h2>
              Reaching
              <br />
              Mirik &amp;
              <br />
              <em>Seeyok Fatak.</em>
            </h2>
            <p className="vr-lede">
              Mirik is in the Darjeeling hills of West Bengal, reachable from the region’s main gateway towns.
            </p>
          </>
        }
        stops={stops}
        note="Travel times vary with road and weather conditions in the hills. Confirm the best route with the school ahead of an admission visit."
      />

      <section className="section visit-arrival">
        <div className="section-heading">
          <div>
            <p className="eyebrow">WHEN YOU ARRIVE</p>
            <h2>
              What you’ll
              <br />
              see on
              <br />
              <em>arrival.</em>
            </h2>
          </div>
          <p>A few corners of the campus to look out for. Hover over a photo to bring it forward.</p>
        </div>
        <ArrivalFan photos={arrival} />
      </section>

      <section className="section pt-0">
        <div className="quick-links">
          <Link href="/admissions">
            <svg
              className="qlink-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
              <path d="M14 3v4h4" />
              <path d="M9 13h6M9 17h6M9 9h2" />
            </svg>
            <span>ADMISSIONS</span>
            <h3>Before you visit</h3>
            <p>What to prepare for an admission visit.</p>
            <em>Explore admissions</em>
          </Link>
          <Link href="/boarding">
            <svg
              className="qlink-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7" />
              <path d="M3 15h18" />
              <path d="M7 11V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3" />
              <path d="M3 18v2M21 18v2" />
            </svg>
            <span>BOARDING LIFE</span>
            <h3>What to ask on-site</h3>
            <p>Questions worth raising when you visit.</p>
            <em>Explore boarding life</em>
          </Link>
          <Link href="/about">
            <svg
              className="qlink-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3 2 8l10 5 10-5-10-5Z" />
              <path d="M6 10.5V16c0 1.6 2.7 3 6 3s6-1.4 6-3v-5.5" />
              <path d="M22 8v6" />
            </svg>
            <span>OUR SCHOOL</span>
            <h3>Learn more first</h3>
            <p>The story and values behind Brindavan.</p>
            <em>About the school</em>
          </Link>
        </div>
      </section>
    </main>
  );
}
