import { useEffect, useState } from 'react';
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
        <meta name="description" content="Shop trending gadgets and essentials from UtilityBay" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Header */}
      <header className="bg-primary text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">UtilityBay</h1>
        <Link href="/cart" className="bg-white text-primary font-semibold px-4 py-2 rounded hover:bg-gray-200">
          🛒 Cart
        </Link>
      </header>

      {/* Hero */}
      <section className="text-center py-10 px-4 bg-gradient-to-br from-primary to-purple-800 text-white">
        <h2 className="text-3xl font-bold mb-3">Smart Gadgets. Fast Shipping.</h2>
        <p className="text-lg">Your favorite essentials at unbeatable prices.</p>
      </section>

      {/* Product Grid */}
      <main className="p-6 max-w-6xl mx-auto">
        <h3 className="text-2xl font-semibold mb-4 text-primary">🛍️ Top Products</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map(product => (
            <div
              key={product._id}
              className={`border rounded-xl p-4 shadow hover:shadow-lg transition ${
                product.stockQty === 0 ? 'opacity-50' : ''
              }`}
            >
              {product.stockQty > 0 ? (
                <Link href={`/product/${product._id}`}>
                  <div>
                    <h4 className="font-bold text-lg">{product.name}</h4>
                    <p className="text-primary text-xl font-semibold">₹{product.price}</p>
                    <p className="text-sm text-gray-600">In Stock: {product.stockQty}</p>
                  </div>
                </Link>
              ) : (
                <div>
                  <h4 className="font-bold text-lg">{product.name}</h4>
                  <p className="text-primary text-xl font-semibold">₹{product.price}</p>
                  <p className="text-red-600 font-semibold mt-1">❌ Out of Stock</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-10 py-6">
        &copy; {new Date().getFullYear()} UtilityBay. All rights reserved.
      </footer>
    </>
  );
}
