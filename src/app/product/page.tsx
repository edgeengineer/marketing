import { ProductCompatibility } from '@/components/sections/product-compatibility';
import { ProductCta } from '@/components/sections/product-cta';
import { ProductFeatures } from '@/components/sections/product-features';
import { ProductHero } from '@/components/sections/product-hero';

export default function ProductPage() {
  return (
    <>
      <ProductHero />
      <ProductFeatures />
      <ProductCompatibility />
      <ProductCta />
    </>
  );
}
