import { useContent } from '../context/ContentProvider'
import SectionHeading from './SectionHeading'
import './Projects.css'
import './sections.css'

export default function Projects() {
  const { content } = useContent()
  const section = content.settings.sections?.cases || content.settings.sections?.projects
  const projects = content.projects

  return (
    <section className="section projects" id="cases">
      <div className="container">
        <SectionHeading
          label={section?.label}
          title={section?.title}
          subtitle={section?.subtitle}
        />
        <div className="projects__grid">
          {projects.map(({ id, title, category, area, year, image, description }) => (
            <article key={id ?? title} className="projects__card">
              <div
                className="projects__image"
                style={{ backgroundImage: `url(${image})` }}
              />
              <div className="projects__info">
                <span className="projects__category">{category}</span>
                <h3>{title}</h3>
                {description && <p className="cases__card-desc">{description}</p>}
                <div className="projects__meta">
                  <span>{area}</span>
                  <span>{year}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
