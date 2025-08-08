import { AboutHero } from '@/components/sections/about-hero';
import { AboutInvestorsContributors } from '@/components/sections/about-investors-contributors';
import { AboutMissionTeam } from '@/components/sections/about-mission-team';
import { AboutTestimonials } from '@/components/sections/about-testimonials';

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      <AboutHero />
      <AboutMissionTeam />
      <AboutInvestorsContributors />
      <AboutTestimonials />
    </div>
  );
}
