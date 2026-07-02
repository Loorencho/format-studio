import { useContent } from '../context/ContentProvider'
import './About.css'

export default function About() {
  const { content } = useContent()
  const about = content.settings.about

  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="about__grid">
          <div className="about__content">
            <p className="about__label">{about.label}</p>
            <h2 className="section-title">{about.title}</h2>
            {about.paragraphs.map((text) => (
              <p key={text.slice(0, 24)} className="about__text">{text}</p>
            ))}
            <a href="#contact" className="btn btn--primary">
              Записаться на замер
            </a>
          </div>
          <div className="about__image-wrap">
            <div
              className="about__image"
              style={about.image_url ? { backgroundImage: `linear-gradient(to top, rgba(26, 31, 46, 0.3), transparent), url(${about.image_url})` } : undefined}
            />
            <div className="about__experience">
              <strong>{about.experience_value}</strong>
              <span>{about.experience_label}</span>
            </div>
          </div>
        </div>
        <div className="about__features">
          {about.features.map(({ icon, title, text }) => (
            <article key={title} className="about__feature">
              <span className="about__feature-icon">{icon}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
