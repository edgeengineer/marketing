import rehypeShiki from '@shikijs/rehype';
import {
  ArrowLeft,
  ClockFading,
  ExternalLink,
  Info,
  Terminal,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import { ReactNode } from 'react';
import remarkGfm from 'remark-gfm';

import { Meteors } from '@/components/magicui/meteors';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { EXTERNAL_LINKS } from '@/constants/external-links';
import { getBlogBySlug, getBlogSlugs } from '@/lib/blog';

// Types for MDX components
type ComponentProps = {
  children: ReactNode;
  className?: string;
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
} & Record<string, unknown>;

// Custom components for MDX
const components = {
  pre: ({ children, ...props }: ComponentProps) => (
    <div className="bg-accent my-8 overflow-auto rounded-lg p-6 font-mono text-sm">
      <pre className="text-sm" {...props}>
        {children}
      </pre>
    </div>
  ),
  code: ({ children, ...props }: ComponentProps) => (
    <code className="" {...props}>
      {children}
    </code>
  ),
  p: ({ children, ...props }: ComponentProps) => (
    <p className="text-foreground my-6 text-base leading-relaxed" {...props}>
      {children}
    </p>
  ),
  h2: ({ children, ...props }: ComponentProps) => (
    <h2
      className="font-weight-display mt-12 mb-4 text-2xl tracking-tighter"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ComponentProps) => (
    <h3
      className="font-weight-display mt-8 mb-4 text-xl tracking-tighter"
      {...props}
    >
      {children}
    </h3>
  ),
  ul: ({ children, ...props }: ComponentProps) => (
    <ul className="text-foreground my-6 list-disc space-y-2 pl-8" {...props}>
      {children}
    </ul>
  ),
  li: ({ children, ...props }: ComponentProps) => (
    <li className="text-base leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: ComponentProps) => (
    <blockquote
      className="border-border text-muted-foreground my-6 border-l-2 pl-6 italic"
      {...props}
    >
      {children}
    </blockquote>
  ),
  a: ({ children, ...props }: ComponentProps) => (
    <a
      className="text-secondary font-normal no-underline hover:underline"
      {...props}
    >
      {children}
    </a>
  ),
  img: ({ src, alt, ...props }: ComponentProps) => (
    <Image
      src={src || ''}
      alt={alt || ''}
      width={1000}
      height={500}
      className="my-8 w-full rounded-lg object-cover"
      {...props}
    />
  ),
  table: ({ children, ...props }: ComponentProps) => (
    <div className="my-8 overflow-x-auto">
      <table
        className="border-border w-full border-collapse border text-sm"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: ComponentProps) => (
    <thead className="bg-muted/50" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }: ComponentProps) => (
    <tbody {...props}>{children}</tbody>
  ),
  tr: ({ children, ...props }: ComponentProps) => (
    <tr className="border-border border-b" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }: ComponentProps) => (
    <th
      className="border-border border px-4 py-3 text-left font-medium"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: ComponentProps) => (
    <td className="border-border border px-4 py-3" {...props}>
      {children}
    </td>
  ),
};

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ''),
  }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return notFound();
  }

  const { content } = await compileMDX({
    source: post.content,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        development: false,
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [
            rehypeShiki,
            {
              themes: {
                light: 'github-light-default',
                dark: 'github-dark-high-contrast',
              },
              defaultColor: false,
            },
          ],
        ],
      },
    },
    components,
  });

  /**
   * Calculate reading time for a given text content
   * @param content Text content to calculate reading time for
   * @param wordsPerMinute Average reading speed (default: 200 wpm)
   * @returns Reading time in minutes (minimum 1 minute)
   */
  function calculateReadingTime(content: string, wordsPerMinute = 200): number {
    // Count words in content (split by spaces and filter out empty strings)
    const words = content.split(/\s+/).filter(Boolean).length;

    // Calculate reading time in minutes
    const minutes = Math.ceil(words / wordsPerMinute);

    // Return at least 1 minute even for very short content
    return Math.max(1, minutes);
  }

  // Calculate reading time based on post content
  const readingTime = calculateReadingTime(post.content);

  // Format date in "March 7, 2025" format
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="container overflow-hidden">
      <div className="hidden border border-t-0 p-7.5 md:block" />

      <div className="border-x">
        <div className="bordered-div-padding mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="text-secondary hover:text-secondary/90 group inline-flex items-center text-sm font-medium md:text-base"
          >
            <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
            Blog
          </Link>
          <div className="text-muted-foreground float-right text-sm md:text-base">
            {formattedDate}
          </div>
        </div>

        <article className="">
          {/* Post header */}
          <div className="border-b">
            <header className="bordered-div-padding mx-auto max-w-3xl space-y-6 !pt-0 md:space-y-8 lg:space-y-10">
              <h1 className="font-weight-display text-2xl leading-snug tracking-tighter md:text-3xl lg:text-5xl">
                {post.title}
              </h1>
              <p className="leading-relaxed md:text-lg">{post.description}</p>

              <div className="flex items-center justify-between">
                {post.authors && post.authors.length > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-3">
                      {post.authors.map(
                        (author) =>
                          author.image && (
                            <Image
                              key={author.name}
                              src={author.image}
                              alt={author.name}
                              width={32}
                              height={32}
                              className="h-8 w-8 rounded-full border-2 border-white"
                            />
                          ),
                      )}
                    </div>
                    <span className="text-muted-foreground text-sm font-medium">
                      {post.authors.map((author) => author.name).join(' and ')}
                    </span>
                  </div>
                )}
                <div className="text-muted-foreground flex items-center text-sm font-medium">
                  <ClockFading className="mr-2 h-5 w-5" />
                  {readingTime} min{readingTime !== 1 ? 's' : ''} read
                </div>
              </div>
            </header>
          </div>

          <div className="bordered-div-padding mx-auto max-w-3xl">
            {/* Post content */}
            <div className="prose prose-lg max-w-none [&>h2:first-of-type]:mt-0">
              {content}
            </div>

            {/* Wrap-up section */}
            <div className="border-border mt-14">
              <h2 className="font-weight-display mb-6 flex items-center text-2xl tracking-tighter">
                <Terminal className="text-muted-foreground mr-2 h-5 w-5" />
                Wrap-up
              </h2>
              <p className="text-foreground mb-8 text-base leading-relaxed">
                A CMS shouldn&apos;t slow you down. Scalar aims to expand into
                your workflow — whether you&apos;re coding content models,
                collaborating on product copy, or launching updates at 2am.
              </p>

              <p className="text-foreground mb-8 text-base leading-relaxed">
                If that sounds like the kind of tooling you want to use —{' '}
                <Link
                  href={EXTERNAL_LINKS.EMAIL}
                  className="text-secondary inline-flex items-center font-medium hover:underline"
                >
                  try Scalar
                  <ExternalLink className="ml-1 h-3.5 w-3.5" />
                </Link>{' '}
                or{' '}
                <Link
                  href={EXTERNAL_LINKS.DISCORD}
                  className="text-secondary inline-flex items-center font-medium hover:underline"
                >
                  join us on Discord
                  <ExternalLink className="ml-1 h-3.5 w-3.5" />
                </Link>
                .
              </p>
            </div>

            {/* Alert component */}
            <Alert className="">
              <Info className="!text-secondary h-4 w-4" />
              <AlertDescription className="text-foreground text-sm">
                Scalar is fully open source. You can self-host or use our cloud
                platform — your workflow, your terms.
              </AlertDescription>
            </Alert>
          </div>
        </article>
        <div className="relative hidden overflow-hidden border-t py-28 md:block">
          <Meteors
            number={1000}
            angle={65}
            maxDuration={20}
            minDuration={5}
            className="opacity-10 [&>div]:opacity-10"
          />
        </div>
      </div>
    </div>
  );
}
