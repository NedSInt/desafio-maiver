import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useThemeStore } from '@/store/themeStore'

interface ThemeToggleProps {
  className?: string
  /** Sidebar: botão com texto. Icon: só ícone (header mobile). */
  variant?: 'sidebar' | 'icon'
}

export function ThemeToggle({ className, variant = 'sidebar' }: ThemeToggleProps) {
  const theme = useThemeStore((s) => s.theme)
  const toggleTheme = useThemeStore((s) => s.toggleTheme)
  const isDark = theme === 'dark'
  const label = isDark ? 'Ativar modo claro' : 'Ativar modo escuro'

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={cn(
          'nav-item inline-flex size-9 shrink-0 items-center justify-center rounded-md',
          className,
        )}
        aria-label={label}
      >
        {isDark ? (
          <Sun className="size-4" strokeWidth={2} aria-hidden />
        ) : (
          <Moon className="size-4" strokeWidth={2} aria-hidden />
        )}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'nav-item nav-item-sidebar flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium',
        className,
      )}
      aria-label={label}
    >
      {isDark ? (
        <Sun className="size-4 shrink-0" strokeWidth={2} aria-hidden />
      ) : (
        <Moon className="size-4 shrink-0" strokeWidth={2} aria-hidden />
      )}
      <span>{isDark ? 'Modo claro' : 'Modo escuro'}</span>
    </button>
  )
}
