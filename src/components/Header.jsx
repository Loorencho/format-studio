import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useContent } from '../context/ContentProvider'
import './Header.css'

const NAV_LINKS = [
  { to: '/o-nas', label: 'О нас' },
  { to: '/uslugi', label: 'Услуги' },
  { to: '/ceny', label: 'Цены' },
  { to: '/keisy', label: 'Кейсы' },
  { to: '/etapy', label: 'Этапы' },
  { to: '/otzyvy', label: 'Отзывы' },
  { to: '/faq', label: 'FAQ' },
  { to: '/kontakty', label: 'Контакты' },
]

export default function Header() {
  const { content } = useContent()
  const contacts = content.settings.contacts
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={`header ${scrolled ? 'header--scrolled' : ''} ${menuOpen ? 'header--menu-open' : ''}`}
    >
      <div className="container header__inner">
        <Link to="/" className="header__logo" onClick={closeMenu}>
          <span className="header__logo-icon">F</span>
          <span className="header__logo-text">
            Студия <span>Формат</span>
          </span>
        </Link>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          <ul className="header__list">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                  onClick={closeMenu}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="header__actions">
            <a href={`tel:${contacts.phone_raw}`} className="header__phone">
              {contacts.phone}
            </a>
            <Link to="/kontakty" className="btn btn--primary header__cta" onClick={closeMenu}>
              Записаться на замер
            </Link>
          </div>
        </nav>

        <button
          type="button"
          className={`header__burger ${menuOpen ? 'header__burger--open' : ''}`}
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
