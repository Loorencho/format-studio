import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#" className="footer__logo">
            <span className="footer__logo-icon">F</span>
            Студия <span>Формат</span>
          </a>
          <p>Студия ремонта и дизайна интерьеров.<br />Работаем в Москве и области.</p>
        </div>
        <div className="footer__links">
          <h4>Навигация</h4>
          <ul>
            <li><a href="#about">О студии</a></li>
            <li><a href="#services">Услуги</a></li>
            <li><a href="#projects">Наши работы</a></li>
            <li><a href="#contact">Контакты</a></li>
          </ul>
        </div>
        <div className="footer__links">
          <h4>Контакты</h4>
          <ul>
            <li><a href="tel:+74951234567">+7 (495) 123-45-67</a></li>
            <li><a href="mailto:hello@format-studio.ru">hello@format-studio.ru</a></li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <p>© {year} Студия Формат. Сайт для студии ремонта.</p>
        </div>
      </div>
    </footer>
  )
}
