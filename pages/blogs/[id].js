// website/pages/blogs/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/blogs/${id}`)
        .then(res => setBlog(res.data))
        .catch(err => console.error('❌ Blog fetch error:', err));
    }
  }, [id]);

  if (!blog) return <p style={{ padding: '2rem' }}>Loading...</p>;

  return (
    <>
      <Head>
        <title>{blog.title} – UtilityBay</title>
      </Head>

      <div style={{ padding: '2rem' }}>
        <h1>{blog.title}</h1>
        <p style={{ fontSize: '0.9rem', color: '#777' }}>
          ✍️ {blog.author} • 📅 {new Date(blog.created_at).toLocaleDateString()}
        </p>
        <div style={{ marginTop: '1rem' }}>
          <p>{blog.content}</p>
        </div>
      </div>
    </>
  );
}
