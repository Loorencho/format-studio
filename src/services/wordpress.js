import { fallbackContent } from '../data/fallbackContent'

const WP_API_URL = import.meta.env.VITE_WP_API_URL?.replace(/\/$/, '')

function mergeSettings(wpSettings = {}) {
  const fb = fallbackContent.settings
  return {
    ...fb,
    ...wpSettings,
    hero: { ...fb.hero, ...wpSettings.hero },
    sections: {
      ...fb.sections,
      ...wpSettings.sections,
      services: { ...fb.sections.services, ...wpSettings.sections?.services },
      cases: { ...fb.sections.cases, ...wpSettings.sections?.cases },
      projects: { ...fb.sections.cases, ...wpSettings.sections?.projects },
    },
    contacts: { ...fb.contacts, ...wpSettings.contacts },
    trust: wpSettings.trust?.length ? wpSettings.trust : fb.trust,
    pricing: wpSettings.pricing?.length ? wpSettings.pricing : fb.pricing,
    process: wpSettings.process?.length ? wpSettings.process : fb.process,
    materials: wpSettings.materials?.length ? wpSettings.materials : fb.materials,
    beforeAfter: wpSettings.beforeAfter?.length ? wpSettings.beforeAfter : fb.beforeAfter,
    reviews: wpSettings.reviews?.length ? wpSettings.reviews : fb.reviews,
    faq: wpSettings.faq?.length ? wpSettings.faq : fb.faq,
  }
}

function mergeContent(wpData) {
  if (!wpData) return fallbackContent

  return {
    settings: mergeSettings(wpData.settings),
    services: wpData.services?.length ? wpData.services : fallbackContent.services,
    projects: wpData.projects?.length ? wpData.projects : fallbackContent.projects,
    source: 'wordpress',
  }
}

export async function fetchWordPressContent() {
  if (!WP_API_URL) {
    return { ...fallbackContent, source: 'fallback' }
  }

  try {
    const res = await fetch(`${WP_API_URL}/format-studio/v1/content`)
    if (!res.ok) throw new Error(`WordPress API: ${res.status}`)
    const data = await res.json()
    return mergeContent(data)
  } catch {
    return { ...fallbackContent, source: 'fallback' }
  }
}

export function isWordPressEnabled() {
  return Boolean(WP_API_URL)
}
