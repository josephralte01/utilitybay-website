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

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">📰 Our Blogs</h1>

        {/* Category Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => handleCategorySelect('')}
            className={`px-3 py-1 rounded-full text-sm font-medium border ${!category ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat._id}
              onClick={() => handleCategorySelect(cat.name)}
              className={`px-3 py-1 rounded-full text-sm font-medium border ${
                category === cat.name ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Blog List */}
        {blogs.length === 0 ? (
          <p className="text-gray-600">
            No blogs found{category ? ` in "${category}"` : ''}.
          </p>
        ) : (
          <ul className="space-y-6">
            {blogs.map(blog => (
              <li key={blog._id} className="border-b pb-4">
                <Link href={`/blogs/${blog._id}`}>
                  <h3 className="text-xl font-semibold hover:text-primary cursor-pointer">
                    {blog.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500 mt-1">
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
