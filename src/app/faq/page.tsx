import { Metadata } from 'next';

import { FAQSection } from '@/components/sections/faq';

export const metadata: Metadata = {
  title: 'FAQs - Scalar',
  description: 'Frequently asked questions about Scalar CMS',
};

export default function FAQPage() {
  return <FAQSection />;
}
