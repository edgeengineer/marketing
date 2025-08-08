'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FaArrowRight, FaDiscord, FaGithub } from 'react-icons/fa6';

import { Button } from '@/components/ui/button';
import { MovingBorder } from '@/components/ui/moving-border';
import { EXTERNAL_LINKS } from '@/constants/external-links';
import { cn } from '@/lib/utils';

import Logo from '../layout/logo';
import Lifestream from '../magicui/lifestream';

export function Hero() {
  return (
    <section className="relative">
      <Lifestream className="absolute inset-0 w-full h-full -z-10" />
      <div className="absolute inset-0 bg-black/40 -z-10" />
      <div className="container relative z-10">
        <div className="bordered-div-padding relative flex flex-col items-center gap-8 border-x text-center md:gap-10 lg:gap-16 lg:!py-25">
          {/* Main Heading */}
          <div className="max-w-4xl space-y-6 md:space-y-8 lg:space-y-12 flex flex-col items-center">
            {/* Beta Banner */}
            <Link
              href="#"
              className="relative inline-flex items-center overflow-hidden p-[1px]"
            >
              <MovingBorder duration={4000}>
                <div
                  className={cn(
                    'h-18 w-25 bg-[radial-gradient(#27b0c5_40%,transparent_60%)] opacity-[0.8]',
                  )}
                />
              </MovingBorder>
              <Button
                variant="outline"
                size="sm"
                className="relative border-none"
              >
                Public beta is starting next week
                <ArrowRight className="ml-1" />
              </Button>
            </Link>
            <Logo wordmarkClassName='w-60 invert' />
            <h1 className="font-weight-display text-2xl leading-snug tracking-tighter md:text-3xl lg:text-5xl text-white">
              The easiest and most powerful way to develop {' '}
              <span className="block">the AI in the physical world.</span>
            </h1>
            <p className="text-white/80 mx-auto max-w-[700px] text-sm leading-relaxed md:text-lg lg:text-xl">
              Edge is the easiest and most powerful operating system for building Edge Computing systems. Build Robots, drones, self driving cars, intelligent cameras, terminals, printers, IoT projects as easy as building a mobile app.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <Button asChild>
              <Link href={EXTERNAL_LINKS.DOCUMENTATION}>
                <FaArrowRight className="size-5" />
                Documentation
                Get Started</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={EXTERNAL_LINKS.DISCORD}>
                <FaDiscord className="size-5" />
                Community
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={EXTERNAL_LINKS.GITHUB}>
                <FaGithub className="size-5" />
                GitHub
              </Link>
            </Button>
          </div>

        </div>
      </div>
      <div className="container">
        <div className="bordered-div-padding flex items-center justify-center border">
          <iframe
            width="1320"
            height="743"
            src="https://www.youtube.com/embed/u0P-g3Jsm8E?controls=1&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&controls=0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-auto aspect-video mask-b-from-55% mask-b-to-95% border-0"
          />
        </div>
      </div>
    </section>
  );
}
