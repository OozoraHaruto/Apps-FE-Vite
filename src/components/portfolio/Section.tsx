export default function Section({ id, eyebrow, title, children }: {
  id?: string
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="pf-section">
      <header className="pf-section-header">
        <p className="pf-eyebrow">{eyebrow}</p>
        <h2 className="pf-section-title">{title}</h2>
      </header>
      {children}
    </section>
  )
}
