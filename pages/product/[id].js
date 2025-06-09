// pages/product/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE}/api/products`)
        .then(res => {
          const match = res.data.find(p => p.id === parseInt(id));
          setProduct(match);
        })
        .catch(err => console.error('Failed to load product:', err));
    }
  }, [id]);

  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...existingCart, product];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('✅ Product added to cart!');
    router.push('/cart'); // Optional: redirect to cart
  };

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <Head>
        <title>{product.name} – UtilityBay</title>
      </Head>
      <div style={{ padding: '2rem' }}>
        <h1>{product.name}</h1>
        <p>Price: ₹{product.price}</p>

        <button
          onClick={addToCart}
          style={{
            padding: '10px 20px',
            background: '#222',
            color: '#fff',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          ➕ Add to Cart
        </button>
      </div>
    </>
  );
}
