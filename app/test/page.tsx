export default function TestPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '1rem',
    }}>
      <h1 style={{ color: '#ff2020', fontSize: '3rem', fontFamily: 'sans-serif' }}>
        ✅ APP IS WORKING
      </h1>
      <p style={{ color: '#1e90ff', fontSize: '1.2rem', fontFamily: 'monospace' }}>
        If you can see this, the Next.js framework is running correctly.
      </p>
      <a href="/" style={{ color: '#fff', marginTop: '2rem', textDecoration: 'underline' }}>
        Go to main page →
      </a>
    </div>
  )
}
