'use client';

import { ClockFading, Package } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { FaDiscord, FaGithub } from 'react-icons/fa6';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EXTERNAL_LINKS } from '@/constants/external-links';
import { cn } from '@/lib/utils';

type Status = 'All' | 'In Progress' | 'Planned' | 'Shipped';

const statuses: Status[] = ['All', 'In Progress', 'Planned', 'Shipped'];

type RoadmapItem = {
  status: Exclude<Status, 'All'>;
  title: string;
  description: string;
  date: string;
};

const roadmapItems: RoadmapItem[] = [
  {
    status: 'In Progress',
    title: 'MLX for NVIDIA Jetson devices',
    description:
      'Develop MLX on your computer and run MLX on NVidia Jetson devices. MLX now has multiple backends including CUDA for NVIDIA Jetson devices and soon ROCm for AMD devices. With MLX, we have a single framework for running both training and inference on edge devices but specialized unified memory architectures common on Apple and NVIDIA Jetson devices.',
    date: 'Beta by October 2025',
  },
  {
    status: 'In Progress',
    title: 'USB Internet Sharing',
    description: 'Flashing an EdgeOS device and plugging it into a computer will use internet sharing to provide internet access to the EdgeOS device which is especially helpful for upgrade packages, refreshing certificates, and running apps that need the broader internet',
    date: 'Q2 2025',
  },
  {
    status: 'In Progress',
    title: 'Transport Services',
    description:
      "A Cross Platform Swift 6 implementation of RFC9622, affectionately nicknamed 'TAPS' but professionall known as Transport Services, is a new way to write network applications that are portable across platforms without diving into the intracacies of low level sockets. TAPS is to what React did for the DOM.",
    date: 'Q3 2025',
  },
  {
    status: 'In Progress',
    title: 'Cross Platform Apache Pulsar Client',
    description:
      "A cross platform client for Apache Pulsar that works on all platforms including iOS, Android, macOS, Windows, and Linux. This will allow EdgeOS devices to communicate with each other and with the cloud using Pulsar's powerful messaging capabilities.",
    date: 'Q3 2025',
  },
  {
    status: 'Planned',
    title: 'Companion App for iOS, Android, macOS, and Windows',
    description:
      'Deploying an EdgeOS device in the wild does not always have a screen. We are building a companion app that will allow you to manage your EdgeOS devices from your phone or computer. It will leverage the ability for your app to remotely control and configure EdgeOS devices for key features like remote debugging, device management, and especially setting Wi-Fi settings',
    date: 'Q3 2025',
  },
  {
    status: 'Planned',
    title: 'Disruption Tolerant Networking and Bundle Protocol V7',
    description:
      'Disruption Tolerant Networking (DTN) is a networking architecture that allows for communication in environments where traditional networking protocols fail, such as in space or remote areas perfect for Satellite and interstellar deployments. Bundle Protocol V7 is the latest version of the protocol used in DTN. We are working on implementing DTN and Bundle Protocol V7 in EdgeOS to enable communication in challenging environments.',
    date: 'Q4 2025',
  },
  {
    status: 'Planned',
    title: 'Companion App for iOS, Android, macOS, and Windows',
    description:
      'Deploying an EdgeOS device in the wild does not always have a screen. We are building a companion app that will allow you to manage your EdgeOS devices from your phone or computer. It will leverage the ability for your app to remotely control and configure EdgeOS devices for key features like remote debugging, device management, and especially setting Wi-Fi settings',
    date: 'Q3 2025',
  },
  {
    status: 'Planned',
    title: 'Zephyr RTOS support',
    description:
      'Support for Zephyr RTOS, a popular real-time operating system for IoT devices, allowing EdgeOS to run on a wider range of hardware including microcontrollers and low-power devices such as the Raspberry Pi Pico, ESP32, and more.',
    date: 'Q3 2025',
  },
  {
    status: 'Shipped',
    title: 'Edge CLI for macOS, Windows, and Linux',
    description:
      "A command line interface for managing EdgeOS devices, including deploying apps, managing devices, and debugging remotely a Swift application",
    date: 'April 2025',
  },
  {
    status: 'Shipped',
    title: 'EdgeOS 0.0.1 for Raspberry Pi 5',
    description:
      'EdgeOS 0.0.1 is now available for Raspberry Pi 5, allowing developers to run EdgeOS on the latest Raspberry Pi hardware.',
    date: 'March 2025',
  },
  {
    status: 'Shipped',
    title: 'EdgeOS 0.0.1 for Raspberry Pi Zero 2 W',
    description:
      'EdgeOS 0.0.1 is now available for Raspberry Pi Zero 2 W, allowing developers to run EdgeOS on the smallest Raspberry Pi hardware.',
    date: 'February 2025',
  },
  {
    status: 'Shipped',
    title: 'EdgeOS for NVIDIA Jetson devices',
    description:
      'NVIDIA Jetson devices are now supported by EdgeOS, allowing developers to run EdgeOS on powerful AI hardware.',
    date: 'January 2025',
  },
];

export function RoadmapSection() {
  const [activeStatus, setActiveStatus] = useState<Status>('All');

  // Filter items based on active status
  const filteredItems =
    activeStatus === 'All'
      ? roadmapItems
      : roadmapItems.filter((item) => item.status === activeStatus);

  return (
    <section className="container">
      <div className="border-x">
        <div className="hidden p-7.5 md:block" />

        <div className="bordered-div-padding border-b">
          <h1 className="font-weight-display text-2xl leading-snug tracking-tighter md:text-3xl lg:text-5xl">
            Roadmap
          </h1>
          <div className="mt-6 block md:hidden">
            <Select
              value={activeStatus}
              onValueChange={(value) => setActiveStatus(value as Status)}
            >
              <SelectTrigger className="w-full">
                <SelectValue>{activeStatus}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bordered-div-padding hidden border-b md:block">
          <Tabs
            value={activeStatus}
            onValueChange={(value) => setActiveStatus(value as Status)}
          >
            <TabsList className="flex gap-3">
              {statuses.map((status) => (
                <TabsTrigger key={status} value={status}>
                  {status}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {filteredItems.map((item, index) => {
            // Determine if this is in the last row
            const isLastRow =
              index >=
              filteredItems.length - (filteredItems.length % 2 === 0 ? 2 : 1);
            // Is it the last item?
            const isLastItem = index === filteredItems.length - 1;
            // Is it odd and in an odd position? (left column)
            const isLeftColumn = index % 2 === 0;
            // Is it the last item in an odd-length list?
            const isLastSingleItem =
              isLastItem && filteredItems.length % 2 !== 0;

            return (
              <Item
                key={index}
                item={item}
                className={cn({
                  // No bottom border for last row items
                  'border-b-0': isLastRow,
                  // No right border for items in the right column
                  'md:border-r-0': !isLeftColumn,
                  // Full width and no borders for last item in odd-length list
                  'md:col-span-2': isLastSingleItem,
                  // Add right border only to left column items
                  'md:border-r': isLeftColumn && !isLastSingleItem,
                })}
              />
            );
          })}
        </div>

        <div className="bordered-div-padding space-y-6 border-t">
          <h3 className="font-weight-display leading-snug tracking-tighter md:text-xl">
            Community engagement
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            We build in public. Want to request something or upvote a feature?
            Join the conversation on:
          </p>
          <div className="flex gap-3 md:gap-6">
            <Link href={EXTERNAL_LINKS.GITHUB} className="">
              <Button size="sm" variant="default" className="">
                <FaGithub className="size-5" />
                Github Discussions
              </Button>
            </Link>
            <Link href={EXTERNAL_LINKS.DISCORD} className="">
              <Button size="sm" variant="outline" className="">
                <FaDiscord className="size-5" />
                Discord
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Item({ item, className }: { item: RoadmapItem; className?: string }) {
  const statusColors: Record<RoadmapItem['status'], string> = {
    'In Progress': 'bg-chart-1/10',
    Planned: 'bg-chart-2/10 ',
    Shipped: 'bg-chart-3/10',
  };

  return (
    <div
      className={cn(
        'bordered-div-padding hover:bg-muted/30 group dark:hover:bg-muted border-b',
        className,
      )}
    >
      <div className="">
        <div className="flex items-center justify-between gap-2">
          <Badge
            variant="default"
            className={cn(
              'text-foreground w-[6.6875rem]',
              statusColors[item.status],
            )}
          >
            {item.status}
          </Badge>
          <div className="text-muted-foreground flex items-center gap-3">
            {item.status === 'Shipped' ? (
              <Package className="size-5" />
            ) : (
              <ClockFading className="size-5" />
            )}
            <span className="text-sm font-medium">{item.date}</span>
          </div>
        </div>
        <h2 className="font-weight-display mt-4 leading-snug tracking-tighter md:text-xl">
          {item.title}
        </h2>
        <p className="text-muted-foreground mt-6 text-sm leading-relaxed md:text-base">
          {item.description}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between md:mt-8 lg:mt-10">
        <Link href={EXTERNAL_LINKS.GITHUB}>
          <FaGithub className="size-5" />
        </Link>
      </div>
    </div>
  );
}
