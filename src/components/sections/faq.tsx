'use client';

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Meteors } from '@/components/magicui/meteors';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Category =
  | 'Developers'
  | 'Content Editing & Workflow'
  | 'Cloud & Hosting'
  | 'Community & Support';

const categories: Category[] = [
  'Developers',
  'Content Editing & Workflow',
  'Cloud & Hosting',
  'Community & Support',
];

type FAQ = {
  question: string;
  answer: React.ReactNode;
};

const faqs: Record<Category, FAQ[]> = {
  Developers: [
    {
      question: 'How do I install Edge in my project?',
      answer: (
        <>
          You can easily install Edge using `brew` on macOS.
          <Link href="https://docs.edge.engineer/" className="text-secondary underline" target='_blank'>
            Quickstart Guide
          </Link>{' '}
          for full details.
        </>
      ),
    },
    {
      question: 'Is Edge open source?',
      answer:
        'Yes, EdgeOS, Edge Agent and Edge CLI and all the public frameworks are fully open source under the MIT license. You can view, modify, and contribute to the codebase on GitHub. However, our Edge Command Intelligence and Control product is a commercial offering with a subscription model.',
    },
    {
      question: 'Why does Edge only support Swift?',
      answer: (
        <>
          At Edge, we believe that the fragmentation of programming languages and tools is the single biggest barrier holding back robotics, IoT, and edge computing. Today, if you search for a tutorial on building for edge devices, you&apos;ll find an inconsistent mess—some in Python, others in C++, Rust, C#, Node.js, or even Ruby. Each project reinvents the wheel, assembling bespoke stacks with different languages for prototyping, production, and performance tuning. This makes collaboration harder, documentation scattered, and onboarding painfully slow.
          <br /><br />
          Our solution is to unify the ecosystem under one powerful, modern, and versatile language: Swift. Swift is:
          <br /><br />
          <strong>Fast and production-ready</strong> — No need to prototype in one language and rewrite in another for performance.
          <br /><br />
          <strong>Deterministic and memory-safe</strong> — Thanks to Automatic Reference Counting (ARC), you get predictable performance without garbage collection pauses.
          <br /><br />
          <strong>Interoperable with C and C++</strong> — Giving you an &quot;escape hatch&quot; for high-performance or legacy system integrations without adding complexity.
          <br /><br />
          <strong>Readable and modern</strong> — Lowering the barrier to entry for new developers while remaining powerful enough for experts.
          <br /><br />
          This is not a new idea—other industries have proven the power of a single-language ecosystem. Unity (C#) and Unreal Engine (C++) transformed game development by creating vertically integrated platforms where developers write in one language and deploy anywhere. These ecosystems thrived because a single language helps a community band together: tutorials, libraries, and tools are shared, understood, and reusable without translation.
          <br /><br />
          Edge aims to replicate that same success for the physical intelligent world—robots, drones, autonomous vehicles, satellites, and industrial IoT. By committing to Swift, we:
          <br /><br />
          • Eliminate the inefficiency of dual-language workflows.
          <br />
          • Create a shared body of knowledge where every blog post, open-source package, and snippet is usable by everyone.
          <br />
          • Enable seamless debugging and deployment experiences like pressing &quot;Run&quot; on a mobile app, but for any edge device.
          <br /><br />
          A single language isn&apos;t about limiting choice—it&apos;s about amplifying productivity, fostering community, and accelerating innovation. Just as web developers are expected to know JavaScript and Android developers to know Kotlin, we envision a future where edge developers speak Swift as the lingua franca of the industry.
        </>
      ),
    },
    {
      question: 'What kind of AI models can you run on EdgeOS?',
      answer: (
        <>
          We support MLX by Apple, which is an Apache 2.0 array framework machine exchange format. Originally designed purely for Apple Silicon with unified memory, MLX has rapidly grown to include support for CUDA for NVIDIA devices like the Jetson series and soon with ROCm for AMD devices.
          <br /><br />
          We recommend visiting{' '}
          <Link href="https://huggingface.co/mlx-community" className="text-secondary underline" target="_blank">
            https://huggingface.co/mlx-community
          </Link>{' '}
          for AI models.
        </>
      ),
    },
  ],
  'Content Editing & Workflow': [
    {
      question: 'Can I create custom content workflows?',
      answer:
        'Yes, Edge allows you to define custom workflows for content creation, review, and publishing. You can set up multiple stages with granular permissions for different team members.',
    },
    {
      question: 'Does Edge support real-time collaboration?',
      answer:
        'Yes, our Cloud plan includes real-time collaboration features, allowing multiple team members to work on content simultaneously with live updates and conflict resolution.',
    },
  ],
  'Cloud & Hosting': [
    {
      question: 'What are the differences between self-hosted and cloud?',
      answer:
        'The self-hosted version gives you complete control over your infrastructure but requires you to manage hosting, backups, and scaling. The Cloud version is fully managed with additional features like real-time collaboration, role-based access controls, and built-in CDN.',
    },
    {
      question: 'Can I migrate from self-hosted to cloud later?',
      answer:
        'Yes, we provide migration tools to easily transfer your content and settings from a self-hosted Edge instance to our cloud platform.',
    },
  ],
  'Community & Support': [
    {
      question: 'Where can I get help with Edge?',
      answer:
        'For the open-source version, we have an active community on Discord and GitHub. Cloud customers receive email support and access to our knowledge base. Enterprise plans include dedicated support channels and SLAs.',
    },
    {
      question: 'How can I contribute to Edge?',
      answer:
        'We welcome contributions! You can contribute code, report bugs, suggest features, or help improve our documentation. Check our GitHub repository for contribution guidelines.',
    },
  ],
};

export function FAQSection() {
  const [activeTab, setActiveTab] = useState<Category>(categories[0]);

  return (
    <section className="overflow-hidden">
      <div className="container divide-y">
        <div className="hidden border-x border-b-0 p-7.5 md:block" />

        <div className="bordered-div-padding border-x">
          <h1 className="font-weight-display text-2xl leading-snug tracking-tighter md:text-3xl lg:text-5xl">
            FAQs
          </h1>
          <div className="mt-6 block md:hidden">
            <Select
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as Category)}
            >
              <SelectTrigger className="w-full">
                <SelectValue>{activeTab}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bordered-div-padding relative hidden border-x md:block">
          <div className="absolute left-full h-[150%] w-[50vw] -translate-y-[90%] overflow-hidden border-y">
            <Meteors
              number={1000}
              angle={65}
              maxDuration={20}
              minDuration={5}
              className="opacity-10 [&>div]:opacity-10"
            />
          </div>
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as Category)}
            className=""
          >
            <TabsList className="flex gap-3">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="border-x">
          <Accordion type="single" collapsible>
            {faqs[activeTab].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="bordered-div-padding font-weight-display flex w-full items-center justify-between !pb-4 text-base hover:no-underline md:!pb-6 md:text-xl [&>svg]:hidden [&[data-state=open]_svg]:rotate-180">
                  <span>{faq.question}</span>
                  <div className="bg-card flex size-8 items-center justify-center border">
                    <ChevronDown className="size-5 shrink-0 tracking-tight transition-transform duration-200" />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground bordered-div-padding max-w-2xl !pt-0 leading-relaxed tracking-tight">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="hidden border-x p-20 md:block" />
      </div>
    </section>
  );
}
