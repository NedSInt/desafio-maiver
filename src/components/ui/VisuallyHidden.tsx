import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface VisuallyHiddenProps {
  children: ReactNode
  as?: 'span' | 'h1' | 'h2' | 'p'
  className?: string
}

export function VisuallyHidden({
  children,
  as: Tag = 'span',
  className,
}: VisuallyHiddenProps) {
  return (
    <Tag
      className={cn(
        'absolute size-px overflow-hidden whitespace-nowrap border-0 p-0',
        '[clip:rect(0,0,0,0)]',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
