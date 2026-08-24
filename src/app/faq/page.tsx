export default function FAQ() {
  return (
    <div className="container section">
      <h1 className="text-gradient">Frequently Asked Questions</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', marginTop: 'var(--spacing-md)' }}>
        {[
          { q: "What is the Red & Gold Edition?", a: "An exclusive tier of service for our most elite clientele." },
          { q: "How do I become a client?", a: "Clientele is currently by invitation or referral only." },
          { q: "What regions do you cover?", a: "We operate globally with strongholds in major financial hubs." }
        ].map((faq, i) => (
          <div key={i} className="glass-panel" style={{ padding: 'var(--spacing-md)' }}>
            <h3 style={{ marginBottom: 'var(--spacing-xs)' }}>{faq.q}</h3>
            <p style={{ margin: 0 }}>{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
