'use client';

import { ChevronDown } from 'lucide-react';
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
  | 'Developers — Getting started & prerequisites'
  | 'Developers — Build, deploy & debug'
  | 'Developers — Frameworks, data & connectivity'
  | 'Developers — OS, devices & updates'
  | 'Businesses — What Edge & Edge CIC do'
  | 'Businesses — Security & compliance'
  | 'Businesses — Operations & lifecycle'
  | 'Businesses — Adoption, ROI & integration';

const categories: Category[] = [
  'Developers — Getting started & prerequisites',
  'Developers — Build, deploy & debug',
  'Developers — Frameworks, data & connectivity',
  'Developers — OS, devices & updates',
  'Businesses — What Edge & Edge CIC do',
  'Businesses — Security & compliance',
  'Businesses — Operations & lifecycle',
  'Businesses — Adoption, ROI & integration',
];

type FAQ = {
  question: string;
  answer: React.ReactNode;
};

const faqs: Record<Category, FAQ[]> = {
  'Developers — Getting started & prerequisites': [
    {
      question: 'What is Edge in one sentence?',
      answer: 'Edge is a Swift-first OS and development stack that makes building for robots, drones, and other edge computers as easy as building a mobile app.',
    },
    {
      question: 'What do I need to start building?',
      answer: 'A Mac or Linux dev machine, Swift 6 toolchain, and a supported edge device (e.g., Raspberry Pi, Jetson). Cross-compiling targets EdgeOS binaries from macOS or Linux.',
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
      question: 'Can I build without adopting EdgeOS yet?',
      answer: 'Yes—the debugger, deployer, and frameworks are designed to work on major Linux distros, while EdgeOS delivers the best experience.',
    },
    {
      question: 'How do I run my first app on device?',
      answer: 'Plug your device in over USB-C, build, and deploy—Edge aims for a "press Command-R" workflow like mobile.',
    },
  ],
  'Developers — Build, deploy & debug': [
    {
      question: 'How is debugging on devices handled?',
      answer: 'EdgeOS includes an LLDB-server so you can attach, set breakpoints, and inspect state over USB, Wi-Fi, or the internet.',
    },
    {
      question: 'What IDE support will be available?',
      answer: 'We&apos;re targeting a lightweight VS Code extension that speaks LSP and works with the Edge tooling for build/deploy/debug.',
    },
    {
      question: 'What is the Edge Development Agent?',
      answer: 'A service on the device that orchestrates SSH/SCP/LLDB-server, app lifecycle, and secure IDE communication—so sessions "just work."',
    },
    {
      question: 'Can I debug remotely in the field?',
      answer: 'Yes—LLDB-server plus the agent enable remote attach flows; CIC augments this with logs, crash reports, and diagnostics.',
    },
    {
      question: 'Is hot-reload supported?',
      answer: 'The goal is fast, iterative deploys (think Cmd-R). Full hot-reload semantics may vary by target and runtime constraints.',
    },
  ],
  'Developers — Frameworks, data & connectivity': [
    {
      question: 'What core libraries do I get?',
      answer: 'SwiftNIO for async I/O, Crypto, and platform APIs; plus Edge-specific networking, Bluetooth, audio/vision, and more.',
    },
    {
      question: 'How do I run AI models on-device?',
      answer: 'Use EdgeAI: load ONNX or Torch models and run via a simple, unified predictor API.',
    },
    {
      question: 'Does Edge support store-and-forward or ad-hoc meshes?',
      answer: 'Yes—our DTN layer (based on Bundle Protocol 7) supports multi-hop, disruption-tolerant messaging with pluggable routing.',
    },
    {
      question: 'What about real-time video/control over multiple links?',
      answer: 'Multipath RTP lets you split media/control across paths (e.g., Starlink + 5G + LTE) for resilience and throughput.',
    },
    {
      question: 'Is there a higher-level streams client?',
      answer: 'Yes—Edge Streams is a high-level wrapper (around Apache Pulsar) for real-time and historical analytics pipelines.',
    },
  ],
  'Developers — OS, devices & updates': [
    {
      question: 'What&apos;s special about EdgeOS?',
      answer: 'It ships ready-to-build with lldb-server, BlueZ, DNS-SD, SQLite, Swiftly, and more—pre-configured for edge use cases.',
    },
    {
      question: 'What is the update model?',
      answer: 'We curate stable releases on top of Arch&apos;s rolling base—fresh developer stacks with production-grade stability for fleets.',
    },
    {
      question: 'Do you support non-Linux microcontrollers today?',
      answer: 'Focus is Linux-class edge hardware now; embedded targets beyond Linux are on the longer-term roadmap.',
    },
    {
      question: 'Can apps be portable to iOS/Android?',
      answer: 'Much of the Swift code is designed to be portable; cross-platform UI targets Linux, macOS, iOS, Android, Wasm, and more.',
    },
    {
      question: 'How are certificates/identity handled?',
      answer: 'CIC centralizes device identity, keys, and cert lifecycle with Swift-Certificates and automated rotation.',
    },
  ],
  'Businesses — What Edge & Edge CIC do': [
    {
      question: 'What problems does Edge solve for us?',
      answer: 'It standardizes edge software so teams ship faster—one language, one toolchain, one deploy/debug path—across robots, kiosks, sensors, and more.',
    },
    {
      question: 'What is CIC (Command, Intelligence & Control)?',
      answer: 'CIC is your fleet command center: monitor devices, push updates, stream data, visualize digital twins, and enforce controls.',
    },
    {
      question: 'How does CIC differ from traditional MDM?',
      answer: 'It&apos;s built for edge/robotics workloads—telemetry analytics, OTA OS & app rollouts, crash diagnostics, real-time streams, and secure remote actions.',
    },
    {
      question: 'Is Edge open or proprietary?',
      answer: 'EdgeOS and the Edge Framework are planned to be open source; CIC adds enterprise fleet capabilities on top.',
    },
    {
      question: 'Where can we deploy?',
      answer: 'On your devices anywhere (factory, field, satellite link), with CIC running in your cloud of choice via standard connectors.',
    },
  ],
  'Businesses — Security & compliance': [
    {
      question: 'How are devices authenticated?',
      answer: 'CIC manages identity with PKI, automates certificate rotation, and enforces mutual TLS for device-to-cloud/device-to-device trust.',
    },
    {
      question: 'Can we restrict who can send commands to devices?',
      answer: 'Yes—fine-grained access policies govern remote control and emergency actions.',
    },
    {
      question: 'Do you support regulated environments?',
      answer: 'CIC&apos;s crypto stack is designed for FIPS-aligned policies and auditability; talk to us about your specific certification needs.',
    },
    {
      question: 'How do you handle vulnerabilities?',
      answer: 'Curated EdgeOS releases, staged rollouts, and rollbacks minimize risk; CIC provides visibility and safe remediation paths.',
    },
    {
      question: 'Is data encrypted in motion?',
      answer: 'Yes—mTLS for transport and optional end-to-end encryption for sensitive streams.',
    },
  ],
  'Businesses — Operations & lifecycle': [
    {
      question: 'How do updates work across thousands of devices?',
      answer: 'CIC does staged OTA OS updates and canary app releases with automatic rollback when needed.',
    },
    {
      question: 'Can we get crash reports and logs from the field?',
      answer: 'Yes—CIC collects structured crash reports, logs, and runtime metrics so engineers can reproduce issues quickly.',
    },
    {
      question: 'Do you support real-time monitoring?',
      answer: 'Live metrics/log/video streaming is built-in and optimized for low-bandwidth or high-latency links.',
    },
    {
      question: 'Can we see our fleet on a map or in 3D?',
      answer: 'Yes—digital twins let you visualize devices, overlay health/AI predictions, and drill into per-device telemetry.',
    },
    {
      question: 'How do we get analytics dashboards?',
      answer: 'CIC ingests telemetry via Edge Streams and supports ad-hoc queries, alerts, and exports to your warehouse/Lake.',
    },
  ],
  'Businesses — Adoption, ROI & integration': [
    {
      question: 'How fast can teams get productive?',
      answer: 'Standardizing on Swift + pre-configured OS/tools shrinks setup from weeks to hours and reduces "stack sprawl."',
    },
    {
      question: 'Will this work with our existing data stack (Snowflake, S3, Kafka, Databricks)?',
      answer: 'Yes—first-class connectors are supported for export and integration.',
    },
    {
      question: 'Are we locked in?',
      answer: 'EdgeOS/Framework are open; CIC uses open formats/protocols so you can integrate or migrate as needed.',
    },
    {
      question: 'What skills do we need to hire for?',
      answer: 'Swift developers with systems/networking or robotics experience—Edge reduces the need for multi-language specialists.',
    },
    {
      question: 'What&apos;s the path to pilot → production?',
      answer: 'Start with a small device cohort, enable CIC telemetry and OTA, validate remote controls/alerts, then scale with staged rollouts.',
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
            Edge FAQ
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
            <TabsList className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="text-xs md:text-sm">
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