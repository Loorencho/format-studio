import { useContent } from '../context/ContentProvider'
import SectionHeading from './SectionHeading'
import './Services.css'

export default function Services() {
  const { content } = useContent()
  const section = content.settings.sections?.services
  const services = content.services

  return (
    <section className="section services" id="services">
      <div className="container">
        <SectionHeading
          label={section?.label}
          title={section?.title}
          subtitle={section?.subtitle}
          center
        />
        <div className="services__grid">
          {services.map(({ id, title, description, items }) => (
            <article key={id ?? title} className="services__card">
              <h3>{title}</h3>
              <p>{description}</p>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
