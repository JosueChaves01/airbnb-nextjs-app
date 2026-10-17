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
import { ScrollProgress } from './components/motion/ScrollProgress';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Highlights />
        <Gallery />
        <Amenities />
        <Reviews />
        <Location />
        <Discover />
        <Contact />
      </main>
      <Footer />
      <StickyBooking />
    </>
  );
}
