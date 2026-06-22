import './Projects.css'

const PROJECTS = [
  {
    title: 'Квартира 78 м², ЖК «Скандинавия»',
    category: 'Ремонт под ключ',
    area: '78 м²',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
  },
  {
    title: 'Студия 34 м², новостройка',
    category: 'Дизайн + ремонт',
    area: '34 м²',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80',
  },
  {
    title: 'Кухня-гостиная, сталинка',
    category: 'Капитальный ремонт',
    area: '42 м²',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=600&q=80',
  },
  {
    title: 'Ванная и санузел',
    category: 'Отделка влажных зон',
    area: '12 м²',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&q=80',
  },
]

export default function Projects() {
  return (
    <section className="section projects" id="projects">
      <div className="container">
        <div className="section-header">
          <p className="projects__label">Портфолио</p>
          <h2 className="section-title">Наши работы</h2>
          <p className="section-subtitle">
            Реальные объекты, которые мы сдали заказчикам
          </p>
        </div>
        <div className="projects__grid">
          {PROJECTS.map(({ title, category, area, year, image }) => (
            <article key={title} className="projects__card">
              <div
                className="projects__image"
                style={{ backgroundImage: `url(${image})` }}
              />
              <div className="projects__info">
                <span className="projects__category">{category}</span>
                <h3>{title}</h3>
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
