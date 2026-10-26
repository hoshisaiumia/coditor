import { useEffect, useState } from 'react'

const STEP = 0.1
const MIN = 0.7
const MAX = 2.5

export function useContentZoom(): number {
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    return window.api.onZoom((action) => {
      setZoom((z) => {
        if (action === 'reset') return 1.3
        const next = action === 'in' ? z + STEP : z - STEP
        return Math.round(Math.min(MAX, Math.max(MIN, next)) * 100) / 100
      })
    })
  }, [])

  return zoom
}
