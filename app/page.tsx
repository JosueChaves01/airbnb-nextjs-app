import { Navbar } from './sections/Navbar';
import { Hero } from './sections/Hero';
import { Highlights } from './sections/Highlights';
import { Gallery } from './sections/Gallery';
import { Amenities } from './sections/Amenities';
import { Reviews } from './sections/Reviews';
import { Location } from './sections/Location';
import { Discover } from './sections/Discover';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { StickyBooking } from './sections/StickyBooking';
import { ScrollAnimations } from './components/ScrollAnimations';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* ethereal-wrapper matches original — shared gradient background for inner sections */}
        <div className="ethereal-wrapper">
          <Highlights />
          <Gallery />
          <Amenities />
          <Reviews />
          <Location />
          <Discover />
          <Contact />
        </div>
      </main>
      <Footer />
      <StickyBooking />
      {/* Replicates original IntersectionObserver fade-in behavior */}
      <ScrollAnimations />
    </>
  );
}
