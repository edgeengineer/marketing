import { Metadata } from 'next';

import { FAQSection } from '@/components/sections/faq';

export const metadata: Metadata = {
  title: 'FAQs - Edge',
  description: 'Frequently asked questions about Edge',
};

export default function FAQPage() {
  return <FAQSection />;
}
