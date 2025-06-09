// website/pages/cart.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(stored);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h1>🛒 Your Cart</h1>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul>
          {cart.map((item, i) => (
            <li key={i}>{item.name} — ₹{item.price}</li>
          ))}
        </ul>
      )}
      <h3>Total: ₹{total}</h3>
      <button onClick={() => router.push('/checkout')}>
        🧾 Proceed to Checkout
      </button>
    </div>
  );
}
