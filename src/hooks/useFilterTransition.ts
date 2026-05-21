import { useEffect, useRef, useState } from 'react'

const FILTER_TRANSITION_MS = 180

/** Breve skeleton ao trocar filtro — feedback de atualização da lista */
export function useFilterTransition(filterValue: string): boolean {
  const [isPending, setIsPending] = useState(false)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    setIsPending(true)
    const timer = setTimeout(() => setIsPending(false), FILTER_TRANSITION_MS)
    return () => clearTimeout(timer)
  }, [filterValue])

  return isPending
}
