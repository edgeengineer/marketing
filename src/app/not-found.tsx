import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { FaDiscord, FaGithub, FaXTwitter } from 'react-icons/fa6';

import { Meteors } from '@/components/magicui/meteors';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EXTERNAL_LINKS } from '@/constants/external-links';

const contactOptions = [
  {
    icon: FaDiscord,
    title: 'Discord',
    description: 'Ask questions, share ideas, or just hang out.',
    href: EXTERNAL_LINKS.DISCORD,
  },
  {
    icon: FaGithub,
    title: 'GitHub',
    description: 'We&apos;re always open to PRs and feature requests.',
    href: EXTERNAL_LINKS.GITHUB,
  },
  {
    icon: FaXTwitter,
    title: 'Twitter/X',
    description: 'Keep up with releases and behind-the-scenes moments.',
    href: EXTERNAL_LINKS.TWITTER,
  },
];

export default function NotFound() {
  return (
    <section className="container">
      <div className="border-x">
        <div className="bordered-div-padding flex flex-col items-center space-y-6 md:space-y-8 lg:space-y-12 lg:!py-25">
          <Badge variant="outline" className="gap-2 py-1.25 text-sm">
            <div className="bg-secondary size-2 rounded-full"></div>
            404 error
          </Badge>

          <h1 className="font-weight-display text-2xl leading-snug tracking-tighter md:text-3xl lg:text-5xl">
            We can&apos;t find this page
          </h1>

          <p className="text-muted-foreground mx-auto max-w-[700px] text-sm leading-relaxed md:text-lg lg:text-xl">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>

          <div className="pt-4">
            <Link href="/">
              <Button className="h-10">
                <Home className="size-4 md:size-5" />
                Go Home
              </Button>
            </Link>
          </div>
        </div>

        <div className="border-t">
          <div className="grid divide-y">
            {contactOptions.map((option, index) => (
              <Link
                key={index}
                href={option.href}
                target="_blank"
                className="bordered-div-padding hover:bg-muted/30 dark:hover:bg-muted transition-color"
              >
                <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <option.icon className="size-5 shrink-0 md:size-6" />
                    <div>
                      <h3 className="font-medium">{option.title}</h3>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {option.description}
                      </p>
                    </div>
                  </div>
                  <div className="bg-card flex size-8 shrink-0 items-center justify-center rounded-sm border">
                    <ChevronRight className="size-5 shrink-0 tracking-tight transition-transform duration-200" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="relative hidden overflow-hidden border-x border-t p-12 md:block md:p-20">
        <Meteors
          number={1000}
          angle={65}
          maxDuration={20}
          minDuration={5}
          className="opacity-10 [&>div]:opacity-10"
        />
      </div>
    </section>
  );
}
