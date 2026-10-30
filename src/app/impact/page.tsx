import type { Metadata } from 'next';
import Link from 'next/link';
import { CountUp } from '@/components/CountUp';
import { PhotoDeck, type DeckPhoto } from '@/components/PhotoDeck';
import { Reveal } from '@/components/Reveal';
import { CertificateFrame } from '@/components/impact/CertificateFrame';
import { RoadStory } from '@/components/impact/RoadStory';

export const metadata: Metadata = {
  title: 'Impact | Brindavan Boarding School',
  description:
    'The difference Brindavan Boarding School makes beyond its gate: a 1.5 km road from Nepal to India, a wooden footbridge, and support for HelpAge India.',
  openGraph: {
    title: 'The Impact of Brindavan Boarding School',
    description: 'A road, a bridge and a cause the whole school stood behind.',
    type: 'website',
  },
};

// TODO(school data): add the year the road and bridge were built, and who uses them, once the
// school confirms. Everything below is limited to what the school has supplied so far.
const bridgePhotos: DeckPhoto[] = [
  {
    src: '/assets/impact/bridge.webp',
    alt: 'A small wooden footbridge with plank railings crossing a stream in a forest clearing',
    caption: 'The footbridge from the side',
  },
  {
    src: '/assets/impact/bridge2.webp',
    alt: 'Looking along the wooden footbridge toward a dirt path that leads into tall trees',
    caption: 'Crossing over, toward the path',
  },
];

export default function ImpactPage() {
  return (
    <main id="main">
      <section className="section page-intro page-intro--photo impact-intro">
        <div>
          <Link className="text-link" href="/" prefetch={false}>
            <span className="back-arrow">←</span> Back to home
          </Link>
          <p className="eyebrow">OUR IMPACT</p>
          <h1>
            Learning that reaches
            <br />
            beyond the <em>school gate.</em>
          </h1>
          <p className="lead">
            Brindavan’s motto is Love All, Serve All. Here is what that has meant for the community around us:
            a road, a bridge, and a cause the whole school stood behind.
          </p>
        </div>
        <figure className="page-intro-photo">
          <img
            src="/assets/impact/road.webp"
            alt="A narrow concrete road curving along a forested hillside under a clear blue sky"
            fetchPriority="high"
          />
        </figure>
      </section>

      <section className="section impact-stats-wrap" aria-label="Impact at a glance">
        <Reveal className="impact-stats">
          <article>
            <p className="impact-stat">
              <CountUp target={1500}>1,500</CountUp>
              <small>m</small>
            </p>
            <p>of road built, linking Nepal and India</p>
          </article>
          <article>
            <p className="impact-stat">
              <CountUp target={1}>1</CountUp>
            </p>
            <p>wooden footbridge across a forest stream</p>
          </article>
          <article>
            <p className="impact-stat">
              <small>₹</small>
              <CountUp target={28410}>28,410</CountUp>
            </p>
            <p>raised for HelpAge India by staff and students</p>
          </article>
        </Reveal>
      </section>

      <section className="section impact-story" id="road">
        <div className="impact-story-copy">
          <p className="eyebrow">IMPACT STORY · 01</p>
          <h2>
            A road from
            <br />
            Nepal to <em>India.</em>
          </h2>
          <p className="lead">
            Brindavan built a 1.5 km road across the forested hillside, connecting Nepal and India.
          </p>
          <p>
            Where there was once only a rough track, there is now a firm path through the bamboo and pine.
            Scroll to follow it from one end to the other.
          </p>
        </div>
        <RoadStory
          src="/assets/impact/road.webp"
          alt="The road Brindavan built, curving through bamboo and young pines on a sunny hillside"
          caption="The road, winding through the hills"
          km={1.5}
          from="NEPAL"
          to="INDIA"
        />
      </section>

      <section className="section impact-story is-flipped academics" id="bridge">
        <div className="impact-story-copy">
          <p className="eyebrow">IMPACT STORY · 02</p>
          <h2>
            A small bridge,
            <br />a safer <em>crossing.</em>
          </h2>
          <p className="lead">Brindavan also built a small wooden footbridge over a forest stream.</p>
          <p>
            Simple timber, built by hand, so that walkers can cross the gully on firm footing. Tap the photo
            to see it from another side.
          </p>
        </div>
        <PhotoDeck photos={bridgePhotos} />
      </section>

      <section className="section impact-story impact-cert" id="helpage">
        <div className="impact-story-copy">
          <p className="eyebrow">RECOGNISED</p>
          <h2>
            Caring for those
            <br />
            who came <em>before us.</em>
          </h2>
          <p className="lead">
            In 2016, the staff and students of Brindavan raised ₹28,410 for HelpAge India, for the care of
            elderly people in need.
          </p>
          <dl className="cert-facts">
            <div>
              <dt>Awarded by</dt>
              <dd>HelpAge India</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>2016</dd>
            </div>
            <div>
              <dt>Raised</dt>
              <dd>₹28,410</dd>
            </div>
            <div>
              <dt>For</dt>
              <dd>The care of the needy aged</dd>
            </div>
          </dl>
        </div>
        <CertificateFrame
          src="/assets/impact/certificate.webp"
          alt="HelpAge India Certificate of Appreciation to the staff and students of Brindavan Boarding School, Seyok Phatak, for raising Rs. 28,410 in 2016"
        />
      </section>
    </main>
  );
}
