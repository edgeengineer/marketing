import { Compatibility } from '@/components/sections/compatibility';
import { Features } from '@/components/sections/features';
import { Hero } from '@/components/sections/hero';
import { Testimonials } from '@/components/sections/testimonials';

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Features />
      <Compatibility />
      <Testimonials />
    </div>
  );
}
