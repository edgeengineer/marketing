'use client';

import { useForm } from '@formspree/react';
import { Heart, Users } from 'lucide-react';
import { useState } from 'react';

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

export function ProfessionalServicesOverview() {
  const [state, handleSubmit] = useForm('mqaqapkl');
  const [open, setOpen] = useState(false);
  return (
    <section className="container">
      <div className="grid grid-cols-1 divide-y border border-t-0 md:grid-cols-2 md:divide-x md:divide-y-0">
        {/* What we deliver Section */}
        <div className="bordered-div-padding space-y-8">
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-muted-foreground flex items-center gap-2 text-sm leading-snug font-medium md:text-base">
              <Heart className="size-5" />
              What we deliver
            </h2>
            <div className="space-y-3 text-sm md:text-base">
              <p className="text-muted-foreground leading-relaxed">
                <span className="text-foreground font-medium">Executive‑ready dashboards & alerts:</span> Real‑time and historical insights that non‑technical teams can use immediately.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <span className="text-foreground font-medium">Operational workflows:</span> Playbooks and automations for inspections, incident response, and maintenance.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <span className="text-foreground font-medium">Device & data lifecycle:</span> Secure onboarding, remote updates (OTA), versioning, and rollback for devices and apps.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <span className="text-foreground font-medium">Digital twins & control:</span> Live 3D context, remote telemetry, and safe remote controls with role‑based access.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <span className="text-foreground font-medium">Integrations:</span> Stream data to your existing lake/warehouse and business tools including Kafka, MQTT, Apache Iceberg, MongoDB, PostgreSQL, MySQL, Oracle, GIS, and more.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <span className="text-foreground font-medium">Training & change management:</span> From first pilot to organization‑wide rollout.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bordered-div-padding relative space-y-8">

          <div className="space-y-4 md:space-y-6">
            <h2 className="text-muted-foreground flex items-center gap-2 text-sm leading-snug font-medium md:text-base">
              <Users className="size-5" />
              How we work (engagement model)
            </h2>
            <div className="space-y-3 text-sm md:text-base">
              <p className="text-muted-foreground leading-relaxed">
                <span className="text-foreground font-medium">Discovery & Value Mapping (1–2 weeks):</span> Stakeholder interviews, site and data review, KPI definition, success metrics, and a pilot plan.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <span className="text-foreground font-medium">Pilot (4–8 weeks):</span> Connect a representative set of devices/sites. Deliver dashboards, alerts, and initial automations.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <span className="text-foreground font-medium">Production Rollout:</span> Harden security, add more sites/devices, implement OTA and app update pipelines, SSO/roles, and reliability SLAs.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <span className="text-foreground font-medium">Scale & Optimize:</span> Predictive models, digital twin visualizations, advanced workflows, and ongoing managed services.
              </p>
            </div>
            <div className="mt-6">
              <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Schedule Call</Button>
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
        </div>
      </div>
    </section>
  );
}
