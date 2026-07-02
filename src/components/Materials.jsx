import { useContent } from '../context/ContentProvider'
import SectionHeading from './SectionHeading'
import './sections.css'

export default function Materials() {
  const { content } = useContent()
  const section = content.settings.sections?.materials
  const brands = content.settings.materials || []

  return (
    <section className="section materials" id="materials">
      <div className="container">
        <SectionHeading
          label={section?.label}
          title={section?.title}
          subtitle={section?.subtitle}
          center
        />
        <ul className="materials__list">
          {brands.map((brand) => (
            <li key={brand}>{brand}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
