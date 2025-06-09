// website/pages/404.js
import Head from 'next/head';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>404 – Page Not Found | UtilityBay</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>🚫 404 – Page Not Found</h1>
        <p>Sorry, we couldn’t find that page.</p>
        <p>
          Maybe try exploring our <Link href="/"><a>home page</a></Link> or check your URL.
        </p>

        <img src="/404-illustration.png" alt="Not Found" style={{ maxWidth: '300px', marginTop: '2rem' }} />

        <br />
        <Link href="/">
          <a style={{
            marginTop: '2rem',
            display: 'inline-block',
            padding: '0.5rem 1rem',
            background: '#222',
            color: '#fff',
            borderRadius: '4px',
            textDecoration: 'none'
          }}>
            ← Go Back Home
          </a>
        </Link>
      </div>
    </>
  );
}
