// website/pages/cart.js
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const removeItem = (id) => {
    const updated = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updated));
    setCart(updated);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const goToCheckout = () => {
    router.push('/checkout');
  };

  return (
    <>
      <Head>
        <title>Your Cart – UtilityBay</title>
      </Head>

      <div style={{ padding: '2rem' }}>
        <h1>🛒 Your Cart</h1>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {cart.map(item => (
                <li key={item.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '1rem' }}>
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                  <button onClick={() => removeItem(item.id)}>❌ Remove</button>
                </li>
              ))}
            </ul>

            <h3>Total: ₹{total}</h3>
            <button onClick={goToCheckout}>✅ Proceed to Checkout</button>
          </>
        )}

        <br /><br />
        <Link href="/">
          <a>← Back to Home</a>
        </Link>
      </div>
    </>
  );
}
