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
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE}/api/blogs/${id}`)
        .then(res => setBlog(res.data))
        .catch(err => console.error('❌ Blog fetch error:', err));
    }
  }, [id]);

  if (!blog) return <p className="p-6 text-gray-600">Loading...</p>;

  return (
    <>
      <Head>
        <title>{blog.title} – UtilityBay</title>
        <meta name="description" content={blog.content.slice(0, 150)} />
      </Head>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{blog.title}</h1>
        <div className="text-sm text-gray-600 space-y-1 mb-6">
          <p>
            ✍️ <strong>{blog.author}</strong> • 📅 {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          <p>📁 <strong>{blog.category || 'Uncategorized'}</strong></p>
          <p>🏷️ {blog.tags?.join(', ') || 'No tags'}</p>
        </div>

        <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
          <p>{blog.content}</p>
        </article>
      </main>
    </>
  );
}
