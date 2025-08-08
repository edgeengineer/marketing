import { Metadata } from 'next';

import { ContactSection } from '@/components/sections/contact';

export const metadata: Metadata = {
  title: 'Contact Us | Edge',
  description:
    'Get in touch with the Edge team. Whether you have questions, feedback, or just want to say hello.',
};

export default function ContactPage() {
  return <ContactSection />;
}
