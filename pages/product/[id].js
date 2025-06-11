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
          const match = res.data.find(p => p._id === id);
          setProduct(match);
        })
        .catch(err => console.error('❌ Failed to load product:', err));
    }
  }, [id]);

  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...existingCart, product];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('✅ Product added to cart!');
    router.push('/cart');
  };

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <>
      <Head>
        <title>{product.name} – UtilityBay</title>
      </Head>

      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-2 text-primary">{product.name}</h1>
        <p className="text-xl font-semibold text-gray-800 mb-1">₹{product.price}</p>

        {product.stockQty > 0 ? (
          <p className="text-green-600 font-medium mb-4">✅ In Stock: {product.stockQty}</p>
        ) : (
          <p className="text-red-600 font-semibold mb-4">❌ Out of Stock</p>
        )}

        <button
          onClick={addToCart}
          disabled={product.stockQty === 0}
          className={`px-6 py-3 rounded-md font-semibold transition ${
            product.stockQty > 0
              ? 'bg-primary text-white hover:bg-purple-900'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          ➕ Add to Cart
        </button>
      </main>
    </>
  );
}
