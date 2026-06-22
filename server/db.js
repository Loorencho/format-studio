import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(__dirname, 'data')
const dbPath = path.join(dataDir, 'leads.json')

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, '[]', 'utf-8')
}

function readLeads() {
  return JSON.parse(fs.readFileSync(dbPath, 'utf-8'))
}

function writeLeads(leads) {
  fs.writeFileSync(dbPath, JSON.stringify(leads, null, 2), 'utf-8')
}

function nowLocal() {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

export function createLead({ name, phone, message = '' }) {
  const leads = readLeads()
  const lead = {
    id: leads.length ? Math.max(...leads.map((l) => l.id)) + 1 : 1,
    name,
    phone,
    message,
    status: 'new',
    created_at: nowLocal(),
  }
  leads.unshift(lead)
  writeLeads(leads)
  return lead
}

export function getAllLeads() {
  return readLeads()
}

export function getLeadById(id) {
  return readLeads().find((l) => l.id === id)
}

export function updateLeadStatus(id, status) {
  const leads = readLeads()
  const index = leads.findIndex((l) => l.id === id)
  if (index === -1) return null
  leads[index] = { ...leads[index], status }
  writeLeads(leads)
  return leads[index]
}

export function deleteLead(id) {
  const leads = readLeads().filter((l) => l.id !== id)
  writeLeads(leads)
}
