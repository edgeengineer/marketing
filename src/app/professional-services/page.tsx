import { ProfessionalServicesHero } from '@/components/sections/professional-services-hero';
import { AboutInvestorsContributors } from '@/components/sections/professional-services-investors-contributors';
import { AboutMissionTeam } from '@/components/sections/professional-services-mission-team';
import { AboutTestimonials } from '@/components/sections/professional-services-testimonials';

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      <ProfessionalServicesHero />
      <AboutMissionTeam />
      <AboutInvestorsContributors />
      <AboutTestimonials />
    </div>
  );
}
