import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: { site: string }) {
  const blog = await getCollection('blog');
  return rss({
    title: 'kuzyy',
    description: 'thoughts on linux, code, and minimal workflows by kuzyy',
    site: context.site || 'https://kuzyy.com',
    items: blog.map((post) => ({
      title: post.data.title.toLowerCase(),
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
