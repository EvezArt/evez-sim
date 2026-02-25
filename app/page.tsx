import Link from 'next/link'

export default function Home() {
  return (
    <div style={{
      background: '#000a03', color: '#e8ffe8', fontFamily: 'monospace',
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 24, padding: 24,
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: '#00ff41', fontSize: 22, fontWeight: 'bold', letterSpacing: 2 }}>EVEZ-OS</div>
        <div style={{ color: '#003311', fontSize: 11, marginTop: 4 }}>Barnes-Hut · dual-descent · FSC ENGINE</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 320 }}>
        <Link href="/sim" style={linkStyle('#00ff41')}>
          → SIMULATION  <span style={{ color: '#003311', fontSize: 10 }}>Three.js · octree · 60fps</span>
        </Link>
        <Link href="/fsc" style={linkStyle('#ff6600')}>
          → FSC ENGINE  <span style={{ color: '#003311', fontSize: 10 }}>failure cartography · prove it</span>
        </Link>
      </div>
      <div style={{ color: '#003311', fontSize: 9, marginTop: 8 }}>
        github.com/EvezArt/evez-sim · AGPL-3.0 · @EVEZ666
      </div>
    </div>
  )
}

function linkStyle(accent: string) {
  return {
    display: 'block', background: '#001a08', border: '1px solid #003311',
    color: accent, padding: '12px 16px', borderRadius: 4,
    textDecoration: 'none', fontSize: 12, fontWeight: 'bold',
  }
}
