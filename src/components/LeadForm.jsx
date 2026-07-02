import { useState } from 'react'
import { useContent } from '../context/ContentProvider'
import { apiUrl } from '../config/api'
import SectionHeading from './SectionHeading'
import './Contact.css'

export default function LeadForm() {
  const { content } = useContent()
  const section = content.settings.sections?.form
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
      const res = await fetch(apiUrl('/api/leads'), {
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
      setError(err.message || 'Сервер недоступен. Позвоните нам по телефону.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section lead-form" id="form">
      <div className="container">
        <div className="contact__grid">
          <SectionHeading
            label={section?.label}
            title={section?.title}
            subtitle={section?.subtitle}
          />

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
                    placeholder="Район, площадь, тип ремонта..."
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
