import { Metadata } from 'next';

import BlogPosts from '@/components/sections/blog-posts';
import { getAllBlogs } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog - Scalar',
  description: 'Latest news, updates, and insights from the Scalar team',
};

export default async function BlogPage() {
  const blogPosts = await getAllBlogs();

  return <BlogPosts blogPosts={blogPosts} />;
}
