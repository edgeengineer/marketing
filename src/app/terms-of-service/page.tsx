import { readFileSync } from 'fs';
import { compileMDX } from 'next-mdx-remote/rsc';
import { join } from 'path';

const components = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <div className="bordered-div-padding">
      <h1 className="font-weight-display text-2xl leading-snug tracking-tighter md:text-3xl lg:text-5xl">
        {children}
      </h1>
    </div>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <div className="bordered-div-padding">
      <h2 className="lg:text-4xxl font-weight-display text-xl leading-snug tracking-tighter md:text-3xl">
        {children}
      </h2>
    </div>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <div className="bordered-div-padding">
      <p className="max-w-3xl leading-relaxed whitespace-pre-wrap">
        {children}
      </p>
    </div>
  ),
  a: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} className="text-secondary hover:underline">
      {children}
    </a>
  ),
};

export default async function TermsOfService() {
  // Read the MDX file
  const filePath = join(process.cwd(), './src/app/terms-of-service/index.mdx');
  const source = readFileSync(filePath, 'utf8');

  // Compile the MDX content
  const { content } = await compileMDX({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        format: 'mdx',
      },
    },
    components,
  });

  return (
    <section className="container">
      <div className="hidden border-x border-b-0 p-7.5 md:block" />

      <div className="divide-y border-x">{content}</div>
    </section>
  );
}
