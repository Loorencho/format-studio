import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentProvider'
import './Footer.css'

const FOOTER_LINKS = [
  { to: '/uslugi', label: 'Услуги' },
  { to: '/ceny', label: 'Стоимость' },
  { to: '/keisy', label: 'Кейсы' },
  { to: '/etapy', label: 'Как работаем' },
  { to: '/kontakty', label: 'Контакты' },
]

export default function Footer() {
  const { content } = useContent()
  const contacts = content.settings.contacts
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <span className="footer__logo-icon">F</span>
            Студия <span>Формат</span>
          </Link>
          <p>Ремонт квартир под ключ в Санкт-Петербурге.<br />Дизайн, отделка и инженерия.</p>
        </div>
        <div className="footer__links">
          <h4>Навигация</h4>
          <ul>
            {FOOTER_LINKS.map(({ to, label }) => (
              <li key={to}><Link to={to}>{label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="footer__links">
          <h4>Контакты</h4>
          <ul>
            <li><a href={`tel:${contacts.phone_raw}`}>{contacts.phone}</a></li>
            <li><a href={`mailto:${contacts.email}`}>{contacts.email}</a></li>
            <li><span>{contacts.address}</span></li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <p>© {year} Студия Формат. Ремонт квартир в СПб.</p>
        </div>
      </div>
    </footer>
  )
}
