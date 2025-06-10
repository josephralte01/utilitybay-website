// pages/blog/[slug].js
import { useRouter } from 'next/router';
import blogs from '../../data/blogs';

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;

  const blog = blogs.find(post => post.slug === slug);

  if (!blog) return <p style={{ padding: '2rem' }}>Blog post not found.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{blog.title}</h1>
      <p><em>{blog.date} by {blog.author}</em></p>
      <p style={{ marginTop: '1rem' }}>{blog.content}</p>
    </div>
  );
}
