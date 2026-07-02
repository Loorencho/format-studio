import { useContent } from '../context/ContentProvider'
import SectionHeading from './SectionHeading'
import './sections.css'

export default function Trust() {
  const { content } = useContent()
  const section = content.settings.sections?.trust
  const items = content.settings.trust || []

  return (
    <section className="section trust" id="trust">
      <div className="container">
        <SectionHeading
          label={section?.label}
          title={section?.title}
          subtitle={section?.subtitle}
          center
        />
        <div className="trust__grid">
          {items.map(({ icon, title, text }) => (
            <article key={title} className="trust__card">
              <span className="trust__icon" aria-hidden="true">{icon}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
