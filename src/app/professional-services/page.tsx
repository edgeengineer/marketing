import { ProfessionalServicesHero } from '@/components/sections/professional-services-hero';
import { ProfessionalServicesOverview } from '@/components/sections/professional-services-overview';
import { ProfessionalServicesPackages } from '@/components/sections/professional-services-packages';
import { AboutTestimonials } from '@/components/sections/professional-services-testimonials';

export default function ProfessionalServicesPage() {
  return (
    <div className="overflow-hidden">
      <ProfessionalServicesHero />
      <ProfessionalServicesOverview />
      <ProfessionalServicesPackages />
      <AboutTestimonials />
    </div>
  );
}
