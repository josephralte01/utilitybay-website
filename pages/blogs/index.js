// website/pages/blogs/index.js
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/blogs`)
      .then(res => setBlogs(res.data))
      .catch(err => console.error('❌ Failed to fetch blogs:', err));
  }, []);

  return (
    <>
      <Head>
        <title>Blogs – UtilityBay</title>
        <meta name="description" content="Latest articles and updates from UtilityBay" />
      </Head>

      <div style={{ padding: '2rem' }}>
        <h1>📰 Our Blogs</h1>
        {blogs.length === 0 ? (
          <p>No blogs yet.</p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {blogs.map(blog => (
              <li key={blog.id} style={{ marginBottom: '1.5rem' }}>
                <Link href={`/blogs/${blog.id}`}>
                  <h3 style={{ marginBottom: 0 }}>{blog.title}</h3>
                </Link>
                <p style={{ fontSize: '0.9rem', color: '#555' }}>
                  ✍️ {blog.author} • 📅 {new Date(blog.created_at).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
