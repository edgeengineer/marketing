'use client';

import { useForm, ValidationError } from '@formspree/react';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { FaBook, FaDiscord, FaGithub, FaXTwitter } from 'react-icons/fa6';

import { PlusSigns } from '@/components/icons/plus-signs';
import { Meteors } from '@/components/magicui/meteors';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { EXTERNAL_LINKS } from '@/constants/external-links';

const contactOptions = [
  {
    icon: FaBook,
    title: 'Documentation',
    description: 'Get started with our comprehensive guides and API docs.',
    href: EXTERNAL_LINKS.DOCUMENTATION,
  },
  {
    icon: FaDiscord,
    title: 'Discord',
    description: 'Ask questions, share ideas, or just hang out.',
    href: EXTERNAL_LINKS.DISCORD,
  },
  {
    icon: FaGithub,
    title: 'GitHub',
    description: "We're always open to PRs and feature requests.",
    href: EXTERNAL_LINKS.GITHUB,
  },
  {
    icon: FaXTwitter,
    title: 'Twitter/X',
    description: 'Keep up with releases and behind-the-scenes moments.',
    href: EXTERNAL_LINKS.TWITTER,
  },
  {
    icon: Mail,
    title: 'Email us directly',
    description: 'For enterprise pricing, partnerships, or anything else:',
    href: EXTERNAL_LINKS.EMAIL,
  }
];

export function ContactSection() {
  const [state, handleSubmit] = useForm("mqaqapkl");

  return (
    <section className="container">
      <div className="hidden border border-t-0 p-7.5 md:block" />

      <div className="grid grid-cols-1 items-center divide-y border-x md:grid-cols-2 md:divide-x md:divide-y-0">
        {/* Left Side - Contact Options */}
        <div className="divide-y">
          <div className="bordered-div-padding relative space-y-6 md:space-y-8 lg:space-y-10">
            <PlusSigns className="absolute inset-0 -mt-0.25 hidden !h-[calc(100%+2px)] -translate-x-full border-y md:block" />
            <h1 className="font-weight-display text-2xl leading-snug tracking-tighter md:text-3xl lg:text-5xl">
              Talk to the Edge team
            </h1>
            <p className="text-muted-foreground mx-auto max-w-[700px] text-sm leading-relaxed md:text-lg lg:text-xl">
              Whether you&apos;re a solo dev, content team, or curious
              contributor—our community is your community.
            </p>
          </div>
          {contactOptions.map((option, index) => (
            <Link
              key={index}
              href={option.href}
              target="_blank"
              className="bordered-div-padding hover:bg-muted/30 dark:hover:bg-muted transition-color flex items-center gap-3"
            >
              <option.icon className="size-10 shrink-0 p-2.5" />
              <div>
                <h3 className="text-secondary font-medium">{option.title}</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  {option.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Side - Contact Form */}
        <div className="bordered-div-padding">
          {state.succeeded ? (
            <div className="flex flex-col items-center justify-center space-y-4 py-8">
              <div className="text-secondary text-5xl">✓</div>
              <p className="text-lg font-medium">Thanks for your message!</p>
              <p className="text-muted-foreground text-sm">We&apos;ll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                  className="text-destructive text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                />
                <ValidationError
                  prefix="Name"
                  field="name"
                  errors={state.errors}
                  className="text-destructive text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your project or question..."
                  rows={6}
                  required
                />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                  className="text-destructive text-sm"
                />
              </div>

              <Button
                type="submit"
                disabled={state.submitting}
                className="w-full"
                size="lg"
              >
                {state.submitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          )}
        </div>
      </div>
      <div className="relative hidden overflow-hidden border-x border-t p-20 md:block">
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
