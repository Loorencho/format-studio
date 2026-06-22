import { useState } from 'react'
import './Contact.css'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const form = e.target
    const data = {
      name: form.name.value,
      phone: form.phone.value,
      message: form.message.value,
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Не удалось отправить заявку')
      }

      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Сервер недоступен. Запустите npm run dev')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact__grid">
          <div className="contact__info">
            <p className="contact__label">Контакты</p>
            <h2 className="section-title">Обсудим ваш ремонт</h2>
            <p className="contact__text">
              Оставьте заявку — дизайнер или прораб свяжется с вами в течение дня,
              ответит на вопросы и назначит бесплатный замер.
            </p>
            <ul className="contact__details">
              <li>
                <strong>Телефон</strong>
                <a href="tel:+74951234567">+7 (495) 123-45-67</a>
              </li>
              <li>
                <strong>Email</strong>
                <a href="mailto:hello@format-studio.ru">hello@format-studio.ru</a>
              </li>
              <li>
                <strong>Шоурум</strong>
                <span>г. Москва, ул. Мастеров, 8, офис 12</span>
              </li>
              <li>
                <strong>Режим работы</strong>
                <span>Пн–Сб: 10:00–20:00</span>
              </li>
            </ul>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            {submitted ? (
              <div className="contact__success">
                <span className="contact__success-icon">✓</span>
                <h3>Заявка отправлена!</h3>
                <p>Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <>
                <div className="contact__field">
                  <label htmlFor="name">Ваше имя</label>
                  <input id="name" name="name" type="text" required placeholder="Иван Иванов" />
                </div>
                <div className="contact__field">
                  <label htmlFor="phone">Телефон</label>
                  <input id="phone" name="phone" type="tel" required placeholder="+7 (___) ___-__-__" />
                </div>
                <div className="contact__field">
                  <label htmlFor="message">О квартире</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Площадь, тип жилья, что хотите сделать..."
                  />
                </div>
                {error && <p className="contact__error">{error}</p>}
                <button type="submit" className="btn btn--primary contact__submit" disabled={loading}>
                  {loading ? 'Отправка…' : 'Записаться на замер'}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
