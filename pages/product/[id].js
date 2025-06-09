// website/pages/product/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/products`)
        .then(res => {
          const found = res.data.find(p => p.id == id);
          setProduct(found);
        });
    }
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('✅ Added to cart');
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>₹{product.price}</p>
      <button onClick={addToCart}>➕ Add to Cart</button>
    </div>
  );
}
