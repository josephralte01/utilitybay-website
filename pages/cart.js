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

      <div style={{ padding: '2rem' }}>
        <h1>🛒 Your Cart</h1>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {cart.map((item, index) => (
                <li key={index} style={{ borderBottom: '1px solid #ccc', paddingBottom: '1rem', marginBottom: '1rem' }}>
                  <h3>{item.name}</h3>
                  <p>Price: ₹{item.price}</p>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button onClick={() => decreaseQty(index)}>-</button>
                    <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                    <button onClick={() => increaseQty(index)}>+</button>
                    <button onClick={() => removeItem(index)} style={{ marginLeft: '1rem', color: 'red' }}>❌ Remove</button>
                  </div>
                  {invalidItems.find(inv => inv._id === item._id) && (
                    <p style={{ color: 'red', fontWeight: 'bold' }}>⚠️ Not enough stock</p>
                  )}
                </li>
              ))}
            </ul>

            <h2>Total: ₹{total}</h2>

            {invalidItems.length > 0 ? (
              <p style={{ color: 'red' }}>⚠️ Please remove or reduce quantity of out-of-stock items to proceed.</p>
            ) : (
              <Link href="/checkout">
                <a style={{
                  backgroundColor: '#111',
                  color: '#fff',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  textDecoration: 'none'
                }}>
                  ✅ Go to Checkout
                </a>
              </Link>
            )}
          </>
        )}
      </div>
    </>
  );
}
