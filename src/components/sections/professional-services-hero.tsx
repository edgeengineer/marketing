'use client';

import { useForm } from '@formspree/react';
import { useState } from 'react';
import { FaCalendar } from 'react-icons/fa6';

import { PlusSigns } from '@/components/icons/plus-signs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function ProfessionalServicesHero() {
  const [state, handleSubmit] = useForm('mqaqapkl');
  const [open, setOpen] = useState(false);
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
            No developers? No problem. We implement Edge and Edge CIC end‑to‑end—so your team can monitor, analyze, and act on data from sensors, cameras, robots, and drones without writing code. We deliver the dashboards, alerts, workflows, and digital twins that drive real decisions.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button>
                <FaCalendar className="size-5" />
                Schedule a call
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e).then(() => {
                  if (!state.errors) {
                    setOpen(false);
                  }
                });
              }}>
                <AlertDialogHeader>
                  <AlertDialogTitle>Schedule a Call</AlertDialogTitle>
                  <AlertDialogDescription>
                    Let&apos;s discuss how we can help with your edge computing needs.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your project or requirements"
                      required
                    />
                  </div>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
                  <AlertDialogAction type="submit" disabled={state.submitting}>
                    {state.submitting ? 'Sending...' : state.succeeded ? 'Sent!' : 'Send'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </form>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </section>
  );
}
