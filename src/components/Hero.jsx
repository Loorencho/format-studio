import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentProvider'
import './Hero.css'

export default function Hero() {
  const { content } = useContent()
  const hero = content.settings.hero

  return (
    <section className="hero">
      <div className="hero__overlay" />
      <div className="container hero__content">
        <div className="hero__badge">{hero.badge}</div>
        <h1 className="hero__title">
          {hero.title}<br />
          <span>{hero.title_accent}</span>
        </h1>
        <p className="hero__text">{hero.text}</p>
        <div className="hero__actions">
          <Link to="/kontakty" className="btn btn--primary">
            {hero.cta_primary}
          </Link>
          <Link to="/keisy" className="btn btn--outline">
            {hero.cta_secondary}
          </Link>
        </div>
        <div className="hero__stats">
          {hero.stats.map(({ value, label }) => (
            <div key={label} className="hero__stat">
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
