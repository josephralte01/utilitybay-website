import { useState } from 'react';
import { useRouter } from 'next/router';
import { register, saveToken } from '../utils/auth';
import Head from 'next/head';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { token } = await register(email, password, name);
      saveToken(token);
      router.push('/account');
    } catch (err) {
      alert('❌ Registration failed. Please try again.');
    }
  };

  return (
    <>
      <Head>
        <title>Register – UtilityBay</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">📝 Create Your Account</h1>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
            />

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded hover:bg-opacity-90 transition"
            >
              ✅ Register
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
