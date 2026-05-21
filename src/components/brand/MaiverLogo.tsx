import { cn } from '@/lib/utils'
import { useThemeStore } from '@/store/themeStore'

interface MaiverLogoProps {
  className?: string
  /** Versão completa (wordmark) ou só o símbolo M */
  variant?: 'full' | 'mark'
  /** Sobrescreve o tema do app (`light` = logo escuro; `dark` = logo claro) */
  theme?: 'light' | 'dark'
}

export function MaiverLogo({
  className,
  variant = 'full',
  theme: themeProp,
}: MaiverLogoProps) {
  const appTheme = useThemeStore((s) => s.theme)
  const theme = themeProp ?? (appTheme === 'dark' ? 'dark' : 'light')
  if (variant === 'mark') {
    return (
      <img
        src="/maiver-mark.svg"
        alt=""
        aria-hidden
        className={cn('h-7 w-auto', className)}
        width={38}
        height={28}
      />
    )
  }

  const src = theme === 'dark' ? '/maiver-logo.svg' : '/maiver-logo-dark.svg'

  return (
    <img
      src={src}
      alt="Maiver"
      className={cn('h-6 w-auto max-w-full', className)}
      width={140}
      height={28}
    />
  )
}
