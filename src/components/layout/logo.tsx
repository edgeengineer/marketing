import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

interface LogoProps {
  iconClassName?: string;
  wordmarkClassName?: string;
  className?: string;
  href?: string;
}

export default function Logo({
  iconClassName,
  wordmarkClassName,
  className,
  href = '/',
}: LogoProps) {
  return (
    <Link href={href} className={cn('flex items-center gap-2.5', className)}>
      <Image
        src="/layout/logo-icon.svg"
        alt="Scalar Logo"
        width={22}
        height={24}
        className={cn('object-contain', iconClassName)}
      />
      <Image
        src="/layout/logo-wordmark.svg"
        alt="Scalar"
        width={51.353}
        height={14.009}
        className={cn('object-contain', wordmarkClassName)}
      />
    </Link>
  );
}
