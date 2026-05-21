import type { ReactNode } from 'react'

interface PageTransitionProps {
  pageKey: string
  children: ReactNode
}

export function PageTransition({ pageKey, children }: PageTransitionProps) {
  return (
    <div key={pageKey} className="animate-page-enter">
      {children}
    </div>
  )
}
