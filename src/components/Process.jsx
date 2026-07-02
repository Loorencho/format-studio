import { useContent } from '../context/ContentProvider'
import SectionHeading from './SectionHeading'
import './sections.css'

export default function Process() {
  const { content } = useContent()
  const section = content.settings.sections?.process
  const steps = content.settings.process || []

  return (
    <section className="section process" id="process">
      <div className="container">
        <SectionHeading
          label={section?.label}
          title={section?.title}
          subtitle={section?.subtitle}
          center
        />
        <ol className="process__steps">
          {steps.map(({ step, title, text }) => (
            <li key={step} className="process__step">
              <span className="process__num">{step}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
