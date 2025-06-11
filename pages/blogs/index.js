import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { category } = router.query;

  const fetchBlogs = async () => {
    try {
      const endpoint = category
        ? `${process.env.NEXT_PUBLIC_API_BASE}/api/blogs?category=${category}`
        : `${process.env.NEXT_PUBLIC_API_BASE}/api/blogs`;

      const res = await axios.get(endpoint);
      setBlogs(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch blogs:', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/blog-categories`);
      setCategories(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch categories:', err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [category]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategorySelect = (cat) => {
    if (cat === '') {
      router.push('/blogs');
    } else {
      router.push(`/blogs?category=${encodeURIComponent(cat)}`);
    }
  };

  return (
    <>
      <Head>
        <title>Blogs – UtilityBay</title>
        <meta name="description" content="Latest articles and updates from UtilityBay" />
      </Head>

      <div style={{ padding: '2rem' }}>
        <h1>📰 Our Blogs</h1>

        {/* Category Filters */}
        <div style={{ marginBottom: '1rem' }}>
          <button
            onClick={() => handleCategorySelect('')}
            style={{
              marginRight: '1rem',
              fontWeight: !category ? 'bold' : 'normal'
            }}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat._id}
              onClick={() => handleCategorySelect(cat.name)}
              style={{
                marginRight: '1rem',
                fontWeight: category === cat.name ? 'bold' : 'normal'
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {blogs.length === 0 ? (
          <p>No blogs found{category ? ` in ${category}` : ''}.</p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {blogs.map(blog => (
              <li key={blog._id} style={{ marginBottom: '2rem' }}>
                <Link href={`/blogs/${blog._id}`}>
                  <h3 style={{ marginBottom: 0 }}>{blog.title}</h3>
                </Link>
                <p style={{ fontSize: '0.9rem', color: '#555' }}>
                  ✍️ {blog.author} • 📅 {new Date(blog.createdAt).toLocaleDateString()}<br />
                  📁 <em>{blog.category || 'Uncategorized'}</em><br />
                  🏷️ {blog.tags?.join(', ') || 'No tags'}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
