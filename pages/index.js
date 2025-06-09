import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE}/api/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error('❌ Failed to fetch products:', err));
  }, []);

  return (
    <>
      <Head>
        <title>UtilityBay – Smart Shopping</title>
        <meta
          name="description"
          content="Shop trending gadgets and essentials from UtilityBay, India's trusted dropshipping store."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Cart shortcut */}
      <div style={{ textAlign: 'right', padding: '1rem' }}>
        <Link href="/checkout">
          🛒 Go to Cart
        </Link>
      </div>

      {/* Product Display */}
      <div style={{ padding: '2rem' }}>
        <h1>🛒 UtilityBay</h1>
        <h2>Our Top Products</h2>

        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {products.map(product => (
            <li key={product.id} style={{
              marginBottom: '1.5rem',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1rem'
            }}>
              <Link href={`/product/${product.id}`}>
                <div>
                  <h3>{product.name}</h3>
                  <p>₹{product.price}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
