import { useState } from 'react'
import { useContent } from '../context/ContentProvider'
import SectionHeading from './SectionHeading'
import './sections.css'

export default function FAQ() {
  const { content } = useContent()
  const section = content.settings.sections?.faq
  const items = content.settings.faq || []
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="section faq" id="faq">
      <div className="container faq__inner">
        <SectionHeading
          label={section?.label}
          title={section?.title}
          subtitle={section?.subtitle}
        />
        <div className="faq__list">
          {items.map(({ q, a }, index) => {
            const isOpen = openIndex === index
            return (
              <article key={q} className={`faq__item ${isOpen ? 'faq__item--open' : ''}`}>
                <button
                  type="button"
                  className="faq__question"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  {q}
                  <span className="faq__icon" aria-hidden="true" />
                </button>
                <div className={`faq__answer-wrap ${isOpen ? 'faq__answer-wrap--open' : ''}`}>
                  <div className="faq__answer-inner">
                    <p className="faq__answer">{a}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
