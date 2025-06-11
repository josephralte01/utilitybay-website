import Head from 'next/head';
import Link from 'next/link';

export default function ThankYou() {
  return (
    <>
      <Head>
        <title>🎉 Thank You – UtilityBay</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 text-center bg-gray-50">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          🎉 Thank You for Your Order!
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          Your order is being processed.
        </p>
        <p className="text-gray-500">
          You’ll receive a confirmation shortly via email or SMS.
        </p>

        <Link href="/" className="mt-6 inline-block">
          <span className="inline-block bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-opacity-90 transition">
            ← Back to Home
          </span>
        </Link>
      </main>
    </>
  );
}
