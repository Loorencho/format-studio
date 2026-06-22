import './About.css'

const FEATURES = [
  {
    icon: '🎨',
    title: 'Дизайн-проект',
    text: '3D-визуализация и подбор материалов до начала работ.',
  },
  {
    icon: '📋',
    title: 'Фиксированная смета',
    text: 'Стоимость прописывается в договоре и не меняется в процессе.',
  },
  {
    icon: '🧹',
    title: 'Чистота на объекте',
    text: 'Ежедневная уборка, вывоз мусора и защита мебели и полов.',
  },
  {
    icon: '🛡️',
    title: 'Гарантия 3 года',
    text: 'На все виды отделочных и инженерных работ.',
  },
]

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="about__grid">
          <div className="about__content">
            <p className="about__label">О студии</p>
            <h2 className="section-title">
              Создаём интерьеры,<br />в которых хочется жить
            </h2>
            <p className="about__text">
              «Студия Формат» — команда дизайнеров, прорабов и мастеров отделки.
              Делаем ремонт квартир и домов в новостройках и вторичном жилье —
              от косметического обновления до полной перепланировки.
            </p>
            <p className="about__text">
              Работаем по договору, ведём фотоотчёты и сдаём объект точно в срок.
              Все материалы закупаем сами — вы получаете готовый результат без хлопот.
            </p>
            <a href="#contact" className="btn btn--primary">
              Записаться на замер
            </a>
          </div>
          <div className="about__image-wrap">
            <div className="about__image" />
            <div className="about__experience">
              <strong>320+</strong>
              <span>объектов</span>
            </div>
          </div>
        </div>
        <div className="about__features">
          {FEATURES.map(({ icon, title, text }) => (
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
