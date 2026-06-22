import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__overlay" />
      <div className="container hero__content">
        <div className="hero__badge">Ремонт с 2012 года</div>
        <h1 className="hero__title">
          Ремонт квартир<br />
          <span>под ключ</span>
        </h1>
        <p className="hero__text">
          Дизайн, черновая и чистовая отделка, сантехника и электрика.
          Создаём уютные интерьеры с фиксированной сметой и сроками.
        </p>
        <div className="hero__actions">
          <a href="#contact" className="btn btn--primary">
            Бесплатный замер
          </a>
          <a href="#projects" className="btn btn--outline">
            Наши работы
          </a>
        </div>
        <div className="hero__stats">
          <div className="hero__stat">
            <strong>320+</strong>
            <span>квартир отремонтировано</span>
          </div>
          <div className="hero__stat">
            <strong>12</strong>
            <span>лет опыта</span>
          </div>
          <div className="hero__stat">
            <strong>3 года</strong>
            <span>гарантия на работы</span>
          </div>
        </div>
      </div>
    </section>
  )
}
