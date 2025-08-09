import { Metadata } from 'next';

import { FAQSection } from '@/components/sections/faq';

export const metadata: Metadata = {
  title: 'Edge FAQ',
  description: 'Frequently asked questions about Edge Engineer - The Swift-first OS and development stack for edge computing',
};

export default function FAQPage() {
  return <FAQSection />;
}
