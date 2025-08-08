'use server';

import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const BLOGS_PATH = path.join(process.cwd(), 'src/blog');

type Author = {
  name: string;
  image: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  authors: Author[];
  tags: string[];
  content: string;
};

// Read all blog posts from the /src/blog directory
export async function getAllBlogs(limit?: number): Promise<BlogPost[]> {
  const files = fs.readdirSync(BLOGS_PATH);
  const blogFiles = files.filter((file) => file.endsWith('.mdx'));

  const posts = blogFiles.map((file) => {
    const filePath = path.join(BLOGS_PATH, file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Extract the slug from the filename (blog-1.mdx -> blog-1)
    const slug = file.replace(/\.mdx$/, '');

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      authors: data.authors || [],
      tags: data.tags || [],
      content,
    };
  });

  // Sort by date (newest first)
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return limit ? sortedPosts.slice(0, limit) : sortedPosts;
}

export async function getBlogSlugs(): Promise<string[]> {
  const files = fs.readdirSync(BLOGS_PATH);
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export async function getBlogBySlug(
  slug: string,
): Promise<BlogPost | undefined> {
  try {
    const filePath = path.join(BLOGS_PATH, `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      authors: data.authors || [],
      tags: data.tags || [],
      content,
    };
  } catch {
    return undefined;
  }
}
