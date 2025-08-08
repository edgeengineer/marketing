import { Heart, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaXTwitter } from 'react-icons/fa6';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

const teamMembers = [
  {
    name: 'Maximilian Alexander',
    role: 'Founder',
    company: 'Zerostatic',
    image: '/images/blog/authors/max-alexander.jpeg',
    github: '#',
    linkedin: '#',
    twitter: '#',
    bio: 'Writes the core and builds the APIs. Loves fast systems, clean code, and black coffee.',
  },
  {
    name: 'Mihai Chiorean',
    role: 'Co-founder',
    company: 'Zerostatic',
    image: '/images/blog/authors/mihai-chiorean.jpeg',
    github: '#',
    linkedin: '#',
    twitter: '#',
    bio: 'Shapes the UI, crafts the experience, and makes sure it feels right.',
  },
  {
    name: 'Hone Komarkowski',
    role: 'Co-founder',
    company: 'Zerostatic',
    image: '/images/blog/authors/hone-komarkowski.jpeg',
    github: '#',
    linkedin: '#',
    twitter: '#',
    bio: 'Shapes the UI, crafts the experience, and makes sure it feels right.',
  },
  {
    name: 'Joannis Orlandos',
    role: 'Co-founder',
    company: 'Zerostatic',
    image: '/images/blog/authors/joannis-orlandos.jpeg',
    github: '#',
    linkedin: '#',
    twitter: '#',
    bio: 'Shapes the UI, crafts the experience, and makes sure it feels right.',
  },
  {
    name: 'Ethan Derr',
    role: 'Engineer',
    company: 'Zerostatic',
    image: '/images/blog/authors/joannis-orlandos.jpeg',
    github: '#',
    linkedin: '#',
    twitter: '#',
    bio: 'Shapes the UI, crafts the experience, and makes sure it feels right.',
  },
];

export function AboutMissionTeam() {
  return (
    <section className="container">
      <div className="grid grid-cols-1 divide-y border border-t-0 md:grid-cols-2 md:divide-x md:divide-y-0">
        {/* Mission Section */}
        <div className="bordered-div-padding space-y-8">
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-muted-foreground flex items-center gap-2 text-sm leading-snug font-medium md:text-base">
              <Heart className="size-5" />
              Mission
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
              <span className="text-foreground font-medium">
                The future of AI in the physical world is on the Edge.
              </span>{' '}
              Edge started as a simple idea: why is it easy to deploy to the Edge for iOS and Android but impossibly
              hard for microcontrollers, NVidia Jetson, and Raspberry Pi? We built Edge to empower developers to build AI systems that run on the Edge, from microcontrollers to powerful AI hardware.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
              We built Edge to empower teams to model, edit, and{' '}
              <span className="text-foreground font-medium">
                ship content collaboratively
              </span>{' '}
              — with the flexibility of{' '}
              <Link
                href="#"
                className="text-secondary font-medium hover:underline"
              >
                your favorite dev tools
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="bordered-div-padding relative space-y-8">
          <div className="bg-secondary text-secondary-foreground absolute top-0 right-0 px-3 py-2.5 text-sm leading-none font-medium">
            We&apos;re hiring!
          </div>

          <div className="space-y-4 md:space-y-6">
            <h2 className="text-muted-foreground flex items-center gap-2 text-sm leading-snug font-medium md:text-base">
              <Users className="size-5" />
              Team
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
              We’re a tiny team building Edge with big care — balancing code,
              design, and community every day.
            </p>

            {/* Team Members */}
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <div key={member.name} className="space-y-3">
                  {/* Desktop: Hover Card */}
                  <div className="hidden md:block">
                    <HoverCard openDelay={200} closeDelay={100}>
                      <HoverCardTrigger asChild>
                        <div className="flex cursor-pointer items-center gap-3">
                          <Image
                            src={member.image}
                            alt={member.name}
                            width={32}
                            height={32}
                            className=""
                          />
                          <p className="text-sm font-medium md:text-base">
                            {member.name}
                          </p>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-94" align="start">
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {member.bio}
                        </p>
                        <div className="mt-4 flex justify-end gap-3">
                          <Link href={member.twitter} aria-label="Twitter">
                            <FaXTwitter className="size-4" />
                          </Link>
                          <Link href={member.github} aria-label="GitHub">
                            <FaGithub className="size-4" />
                          </Link>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>

                  {/* Mobile: Normal Card */}
                  <div className="space-y-2 md:hidden">
                    <div className="flex items-center gap-3">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={24}
                        height={24}
                        className=""
                      />
                      <p className="text-sm font-medium">{member.name}</p>
                    </div>
                    <Card className="gap-2">
                      <CardContent className="text-muted-foreground text-sm leading-relaxed">
                        {member.bio}
                      </CardContent>
                      <CardFooter className="flex justify-end gap-3">
                        <Link href={member.twitter} aria-label="Twitter">
                          <FaXTwitter className="size-4" />
                        </Link>
                        <Link href={member.github} aria-label="GitHub">
                          <FaGithub className="size-4" />
                        </Link>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
