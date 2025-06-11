import { useState } from 'react';
import { useRouter } from 'next/router';
import { login, saveToken } from '../utils/auth';
import Head from 'next/head';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token } = await login(email, password);
      saveToken(token);
      router.push('/account');
    } catch (err) {
      alert('❌ Login failed. Please check your credentials.');
    }
  };

  return (
    <>
      <Head>
        <title>Login – UtilityBay</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">🔐 Login to Your Account</h1>

          <form onSubmit={handleLogin} className="space-y-4">
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
              🔓 Login
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            Don’t have an account?{' '}
            <Link href="/register" className="text-primary font-medium hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
