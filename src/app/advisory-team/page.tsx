export default function AdvisoryTeam() {
  return (
    <div className="container section">
      <h1 className="text-gradient">The Advisory Team</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-lg)', marginTop: 'var(--spacing-md)' }}>
        {['CEO', 'Managing Director', 'Head of Acquisitions'].map((role, i) => (
          <div key={i} className="glass-panel" style={{ padding: 'var(--spacing-md)', textAlign: 'center' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: 'var(--radius-full)', background: 'var(--surface-hover)', margin: '0 auto var(--spacing-sm)' }}></div>
            <h3>Executive Name</h3>
            <p style={{ color: 'var(--secondary)' }}>{role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
