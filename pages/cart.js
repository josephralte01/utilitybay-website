import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [invalidItems, setInvalidItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    const withQuantity = stored.map(item => ({ ...item, quantity: item.quantity || 1 }));
    setCart(withQuantity);
  }, []);

  useEffect(() => {
    const validateStock = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/products`);
        const productMap = Object.fromEntries(res.data.map(p => [p._id, p]));

        const invalid = cart.filter(item => {
          const dbProduct = productMap[item._id];
          return !dbProduct || dbProduct.stockQty < item.quantity;
        });

        setInvalidItems(invalid);
      } catch (err) {
        console.error('Stock validation failed:', err);
      }
    };

    if (cart.length > 0) validateStock();
  }, [cart]);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const increaseQty = (index) => {
    const updated = [...cart];
    updated[index].quantity += 1;
    updateCart(updated);
  };

  const decreaseQty = (index) => {
    const updated = [...cart];
    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
      updateCart(updated);
    }
  };

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    updateCart(updated);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <Head>
        <title>🛒 Cart – UtilityBay</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">🛒 Your Cart</h1>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cart.map((item, index) => (
                <li key={index} className="border p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => decreaseQty(index)} className="px-2 py-1 bg-gray-200 rounded">−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(index)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                    <button onClick={() => removeItem(index)} className="ml-4 text-red-600">❌ Remove</button>
                  </div>
                  {invalidItems.find(inv => inv._id === item._id) && (
                    <p className="text-red-500 font-medium mt-2">⚠️ Not enough stock</p>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h2 className="text-xl font-semibold">Total: ₹{total}</h2>
            </div>

            {invalidItems.length > 0 ? (
              <p className="text-red-600 mt-4">⚠️ Please fix out-of-stock items to proceed.</p>
            ) : (
              <Link href="/checkout">
                <span className="inline-block mt-6 bg-primary text-white px-6 py-3 rounded hover:bg-purple-900 cursor-pointer">
                  ✅ Go to Checkout
                </span>
              </Link>
            )}
          </>
        )}
      </main>
    </>
  );
}
