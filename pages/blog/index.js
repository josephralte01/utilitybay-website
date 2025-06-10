// pages/blog/index.js
import Link from 'next/link';
import blogs from '../../data/blogs';

export default function BlogList() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>📝 UtilityBay Blog</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {blogs.map(blog => (
          <li key={blog.id} style={{ marginBottom: '1.5rem' }}>
            <Link href={`/blog/${blog.slug}`}>
              <a style={{ fontSize: '1.2rem', color: '#0070f3' }}>
                {blog.title}
              </a>
            </Link>
            <p><em>{blog.date} by {blog.author}</em></p>
          </li>
        ))}
      </ul>
    </div>
  );
}
