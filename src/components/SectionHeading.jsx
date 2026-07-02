export default function SectionHeading({ label, title, subtitle, center = false }) {
  return (
    <div className={`section-header ${center ? 'section-header--center' : ''}`}>
      {label && <p className="section-label">{label}</p>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  )
}
