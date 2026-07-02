import { useContent } from '../context/ContentProvider'
import SectionHeading from './SectionHeading'
import './sections.css'

export default function BeforeAfter() {
  const { content } = useContent()
  const section = content.settings.sections?.beforeAfter
  const items = content.settings.beforeAfter || []

  return (
    <section className="section before-after" id="before-after">
      <div className="container">
        <SectionHeading
          label={section?.label}
          title={section?.title}
          subtitle={section?.subtitle}
          center
        />
        <div className="before-after__list">
          {items.map(({ id, title, before, after }) => (
            <article key={id} className="before-after__item">
              <h3>{title}</h3>
              <div className="before-after__pair">
                <figure>
                  <img src={before} alt={`${title} — до`} loading="lazy" />
                  <figcaption>До</figcaption>
                </figure>
                <figure>
                  <img src={after} alt={`${title} — после`} loading="lazy" />
                  <figcaption>После</figcaption>
                </figure>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
