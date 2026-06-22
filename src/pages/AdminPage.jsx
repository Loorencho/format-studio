import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import './AdminPage.css'

const TOKEN_KEY = 'format_admin_token'

function formatDate(dateStr) {
  return new Date(dateStr.replace(' ', 'T')).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function AdminPage() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY))
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetchError, setFetchError] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  const fetchLeads = useCallback(async (authToken) => {
    setLoading(true)
    setFetchError('')
    try {
      const res = await fetch('/api/leads', {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      if (res.status === 401) {
        sessionStorage.removeItem(TOKEN_KEY)
        setToken(null)
        return
      }
      if (!res.ok) throw new Error('Не удалось загрузить заявки')
      setLeads(await res.json())
    } catch {
      setFetchError('Ошибка загрузки. Проверьте, что сервер запущен.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (token) fetchLeads(token)
  }, [token, fetchLeads])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setLoginError(data.error || 'Ошибка входа')
        return
      }
      sessionStorage.setItem(TOKEN_KEY, data.token)
      setToken(data.token)
      setPassword('')
    } catch {
      setLoginError('Сервер недоступен. Запустите npm run dev')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setLeads([])
  }

  const toggleStatus = async (lead) => {
    const newStatus = lead.status === 'new' ? 'done' : 'new'
    const res = await fetch(`/api/leads/${lead.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    })
    if (res.ok) {
      const updated = await res.json()
      setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)))
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    const res = await fetch(`/api/leads/${deleteTarget.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (res.ok) {
      setLeads((prev) => prev.filter((l) => l.id !== deleteTarget.id))
      setDeleteTarget(null)
    }
  }

  if (!token) {
    return (
      <div className="admin admin--login">
        <div className="admin-login">
          <Link to="/" className="admin-login__back">← На сайт</Link>
          <h1>Админ-панель</h1>
          <p>Студия Формат — заявки с сайта</p>
          <form onSubmit={handleLogin}>
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
            />
            {loginError && <p className="admin-login__error">{loginError}</p>}
            <button type="submit" className="btn btn--primary">Войти</button>
          </form>
          <p className="admin-login__hint">Пароль по умолчанию: <code>format2025</code></p>
        </div>
      </div>
    )
  }

  const newCount = leads.filter((l) => l.status === 'new').length

  return (
    <div className="admin">
      <header className="admin-header">
        <div className="admin-header__inner container">
          <div>
            <h1>Заявки</h1>
            <p>{newCount > 0 ? `${newCount} новых` : 'Нет новых заявок'}</p>
          </div>
          <div className="admin-header__actions">
            <button
              type="button"
              className="btn btn--dark"
              onClick={() => fetchLeads(token)}
              disabled={loading}
            >
              {loading ? 'Загрузка…' : 'Обновить'}
            </button>
            <Link to="/" className="btn btn--outline-dark">На сайт</Link>
            <button type="button" className="admin-header__logout" onClick={handleLogout}>
              Выйти
            </button>
          </div>
        </div>
      </header>

      <main className="admin-main container">
        {fetchError && <p className="admin-error">{fetchError}</p>}

        {!fetchError && leads.length === 0 && !loading && (
          <div className="admin-empty">
            <p>Заявок пока нет</p>
            <span>Отправьте тестовую заявку с главной страницы</span>
          </div>
        )}

        <div className="admin-list">
          {leads.map((lead) => (
            <article
              key={lead.id}
              className={`admin-card ${lead.status === 'new' ? 'admin-card--new' : ''}`}
            >
              <div className="admin-card__head">
                <span className="admin-card__id">#{lead.id}</span>
                <span className={`admin-card__status admin-card__status--${lead.status}`}>
                  {lead.status === 'new' ? 'Новая' : 'Обработана'}
                </span>
                <time>{formatDate(lead.created_at)}</time>
              </div>
              <h2>{lead.name}</h2>
              <a href={`tel:${lead.phone}`} className="admin-card__phone">{lead.phone}</a>
              {lead.message && <p className="admin-card__message">{lead.message}</p>}
              <div className="admin-card__actions">
                <button type="button" onClick={() => toggleStatus(lead)}>
                  {lead.status === 'new' ? 'Отметить обработанной' : 'Вернуть в новые'}
                </button>
                <button
                  type="button"
                  className="admin-card__delete"
                  onClick={() => setDeleteTarget(lead)}
                >
                  Удалить заявку
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>

      {deleteTarget && (
        <div className="admin-modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Удалить заявку?</h2>
            <p>
              Заявка <strong>#{deleteTarget.id}</strong> от{' '}
              <strong>{deleteTarget.name}</strong> будет удалена без возможности восстановления.
            </p>
            <div className="admin-modal__actions">
              <button type="button" className="admin-modal__cancel" onClick={() => setDeleteTarget(null)}>
                Отмена
              </button>
              <button type="button" className="admin-modal__confirm" onClick={handleDelete}>
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
