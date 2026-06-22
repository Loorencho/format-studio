import './Services.css'

const SERVICES = [
  {
    title: 'Ремонт под ключ',
    description: 'Полный цикл: от демонтажа до финальной уборки и расстановки мебели.',
    items: ['Черновая отделка', 'Чистовая отделка', 'Сдача с актом'],
  },
  {
    title: 'Капитальный ремонт',
    description: 'Замена коммуникаций, выравнивание стен, новые полы и потолки.',
    items: ['Перепланировка', 'Электрика и сантехника', 'Стяжка и штукатурка'],
  },
  {
    title: 'Косметический ремонт',
    description: 'Быстрое обновление интерьера без масштабных переделок.',
    items: ['Покраска и обои', 'Замена напольного покрытия', 'Обновление плинтусов'],
  },
  {
    title: 'Кухня и ванная',
    description: 'Специализированный ремонт влажных зон с гидроизоляцией.',
    items: ['Укладка плитки', 'Монтаж сантехники', 'Натяжные и подвесные потолки'],
  },
  {
    title: 'Дизайн-проект',
    description: 'Планировочные решения, 3D-визуализация и ведомость материалов.',
    items: ['План расстановки', 'Подбор отделки', 'Авторский надзор'],
  },
  {
    title: 'Ремонт в новостройке',
    description: 'От белой коробки до готовой квартиры с учётом особенностей застройщика.',
    items: ['Приёмка от застройщика', 'Разводка коммуникаций', 'Отделка под ключ'],
  },
]

export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="section-header section-header--center">
          <p className="services__label">Услуги</p>
          <h2 className="section-title">Чем мы занимаемся</h2>
          <p className="section-subtitle">
            Ремонт любой сложности — от одной комнаты до всей квартиры
          </p>
        </div>
        <div className="services__grid">
          {SERVICES.map(({ title, description, items }) => (
            <article key={title} className="services__card">
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
