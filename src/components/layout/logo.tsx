import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

interface LogoProps {
  iconClassName?: string;
  wordmarkClassName?: string;
  className?: string;
  href?: string;
  wordmark?: boolean;
}

export default function Logo({
  iconClassName,
  wordmarkClassName,
  className,
  href = '/',
  wordmark = true,
}: LogoProps) {
  return (
    <Link href={href} className={cn('flex items-center gap-2.5', className)}>
      {!wordmark && (
        <Image
          src="/layout/logo-icon.svg"
          alt="Scalar Logo"
          width={22}
          height={24}
          className={cn('object-contain', iconClassName)}
        />)}
      {wordmark && (
        <Image
          src="/layout/logo-wordmark.svg"
          alt="Scalar"
          width={60.353}
          height={20.009}
          className={cn('object-contain', wordmarkClassName)}
        />
      )}
    </Link>
  );
}
