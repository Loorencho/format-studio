import { useContent } from '../context/ContentProvider'
import SectionHeading from './SectionHeading'
import './sections.css'

export default function Reviews() {
  const { content } = useContent()
  const section = content.settings.sections?.reviews
  const reviews = content.settings.reviews || []

  return (
    <section className="section reviews" id="reviews">
      <div className="container">
        <SectionHeading
          label={section?.label}
          title={section?.title}
          subtitle={section?.subtitle}
          center
        />
        <div className="reviews__grid">
          {reviews.map(({ id, name, text, date, rating }) => (
            <article key={id} className="reviews__card">
              <div className="reviews__screen">
                <div className="reviews__screen-bar" />
                <div className="reviews__screen-body">
                  <div className="reviews__stars" aria-label={`Оценка ${rating} из 5`}>
                    {'★'.repeat(rating)}
                  </div>
                  <p>{text}</p>
                  <footer>
                    <strong>{name}</strong>
                    <span>{date}</span>
                  </footer>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
