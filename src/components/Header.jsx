import { useState, useEffect } from 'react'
import './Header.css'

const NAV_LINKS = [
  { href: '#about', label: 'О студии' },
  { href: '#services', label: 'Услуги' },
  { href: '#projects', label: 'Наши работы' },
  { href: '#contact', label: 'Контакты' },
]

export default function Header() {
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
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        <a href="#" className="header__logo" onClick={closeMenu}>
          <span className="header__logo-icon">F</span>
          <span className="header__logo-text">
            Студия <span>Формат</span>
          </span>
        </a>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          <ul className="header__list">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a href={href} onClick={closeMenu}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a href="tel:+74951234567" className="header__phone">
            +7 (495) 123-45-67
          </a>
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
