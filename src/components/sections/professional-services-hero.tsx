import Link from 'next/link';
import { FaDiscord, FaGithub } from 'react-icons/fa6';

import { PlusSigns } from '@/components/icons/plus-signs';
import { Button } from '@/components/ui/button';
import { EXTERNAL_LINKS } from '@/constants/external-links';

export function ProfessionalServicesHero() {
  return (
    <section className="container">
      <div className="bordered-div-padding relative flex flex-col items-center gap-8 border-x border-b text-center md:gap-10 lg:gap-16 lg:!py-25">
        <PlusSigns className="absolute inset-0 left-full -mt-0.25 hidden !h-[calc(100%+2px)] border-b md:block" />

        {/* Main Heading */}
        <div className="max-w-4xl space-y-6 md:space-y-8 lg:space-y-12">
          <h1 className="font-weight-display text-2xl leading-snug tracking-tighter md:text-3xl lg:text-5xl">
            Let&apos;s help you implement,{' '}
            <span className="block">AI at the Edge</span>
          </h1>
          <p className="text-muted-foreground mx-auto max-w-[700px] text-sm leading-relaxed md:text-lg lg:text-xl">
            Our professional services team is heere to help you implement Edge in your projects. Whether you need custom solutions, training, or support, we have the expertise to guide you through every step.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <Button asChild>
            <Link href={EXTERNAL_LINKS.DISCORD}>
              <FaDiscord className="size-5" />
              Join our Discord
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={EXTERNAL_LINKS.GITHUB}>
              <FaGithub className="size-5" />
              Star on GitHub
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
