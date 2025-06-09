import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>🛒 UtilityBay</h1>
      <h2>Our Top Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
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
  );
}
