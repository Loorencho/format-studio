import { useContent } from '../context/ContentProvider'
import SectionHeading from './SectionHeading'
import './sections.css'

export default function Pricing() {
  const { content } = useContent()
  const section = content.settings.sections?.pricing
  const items = content.settings.pricing || []

  return (
    <section className="section pricing" id="pricing">
      <div className="container">
        <SectionHeading
          label={section?.label}
          title={section?.title}
          subtitle={section?.subtitle}
          center
        />
        <div className="pricing__grid">
          {items.map(({ type, price, unit, note }) => (
            <article key={type} className="pricing__card">
              <h3>{type}</h3>
              <p className="pricing__price">
                {price} <span>{unit}</span>
              </p>
              <p className="pricing__note">{note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
