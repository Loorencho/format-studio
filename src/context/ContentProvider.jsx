import { createContext, useContext, useEffect, useState } from 'react'
import { fetchWordPressContent } from '../services/wordpress'
import { fallbackContent } from '../data/fallbackContent'

const ContentContext = createContext({
  content: fallbackContent,
  loading: true,
  source: 'fallback',
})

export function ContentProvider({ children }) {
  const [content, setContent] = useState(fallbackContent)
  const [loading, setLoading] = useState(true)
  const [source, setSource] = useState('fallback')

  useEffect(() => {
    let active = true

    fetchWordPressContent().then((data) => {
      if (!active) return
      setContent(data)
      setSource(data.source || 'fallback')
      setLoading(false)
    })

    return () => {
      active = false
    }
  }, [])

  return (
    <ContentContext.Provider value={{ content, loading, source }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  return useContext(ContentContext)
}
