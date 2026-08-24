export default function PropertyDetails() {
  return (
    <div className="container section">
      <h1 className="text-gradient">Premium Properties</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-lg)', marginTop: 'var(--spacing-md)' }}>
        {[1, 2, 3].map(i => (
          <div key={i} className="glass-panel" style={{ overflow: 'hidden' }}>
            <div style={{ height: '200px', background: 'var(--surface-hover)' }}></div>
            <div style={{ padding: 'var(--spacing-md)' }}>
              <h3 style={{ marginBottom: 'var(--spacing-xs)' }}>Exclusive Estate {i}</h3>
              <p>Off-market opportunity in prime location.</p>
              <button className="btn btn-secondary">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
