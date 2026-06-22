import express from 'express'
import cors from 'cors'
import crypto from 'crypto'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  createLead,
  getAllLeads,
  updateLeadStatus,
  deleteLead,
} from './db.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'format2025'

const adminTokens = new Set()

app.use(cors())
app.use(express.json())

function authAdmin(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (token && adminTokens.has(token)) {
    return next()
  }
  res.status(401).json({ error: 'Требуется авторизация' })
}

app.post('/api/leads', (req, res) => {
  const { name, phone, message } = req.body

  if (!name?.trim() || !phone?.trim()) {
    return res.status(400).json({ error: 'Укажите имя и телефон' })
  }

  const lead = createLead({
    name: name.trim(),
    phone: phone.trim(),
    message: (message || '').trim(),
  })

  res.status(201).json(lead)
})

app.post('/api/admin/login', (req, res) => {
  const { password } = req.body

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Неверный пароль' })
  }

  const token = crypto.randomUUID()
  adminTokens.add(token)
  res.json({ token })
})

app.get('/api/leads', authAdmin, (_req, res) => {
  res.json(getAllLeads())
})

app.patch('/api/leads/:id', authAdmin, (req, res) => {
  const id = Number(req.params.id)
  const { status } = req.body

  if (!['new', 'done'].includes(status)) {
    return res.status(400).json({ error: 'Недопустимый статус' })
  }

  const lead = updateLeadStatus(id, status)
  if (!lead) {
    return res.status(404).json({ error: 'Заявка не найдена' })
  }

  res.json(lead)
})

app.delete('/api/leads/:id', authAdmin, (req, res) => {
  const id = Number(req.params.id)
  deleteLead(id)
  res.json({ ok: true })
})

if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../dist')
  app.use(express.static(distPath))
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next()
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`API: http://localhost:${PORT}`)
})
