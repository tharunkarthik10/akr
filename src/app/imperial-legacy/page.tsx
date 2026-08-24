export default function ImperialLegacy() {
  return (
    <div className="container section" style={{ textAlign: 'center' }}>
      <h1 className="text-gradient" style={{ fontSize: '3rem' }}>Imperial Legacy</h1>
      <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: 'var(--spacing-md) auto' }}>
        The ultimate tier of real estate ownership. Assets that define dynasties.
      </p>
      <div className="glass-panel" style={{ padding: 'var(--spacing-xl)', marginTop: 'var(--spacing-lg)' }}>
        <h2 style={{ color: 'var(--secondary)' }}>By Invitation Only</h2>
        <p>Please contact your dedicated advisor to access the Imperial Legacy portfolio.</p>
        <a href="/contact" className="btn btn-primary" style={{ marginTop: 'var(--spacing-sm)' }}>Contact Advisor</a>
      </div>
    </div>
  );
}
