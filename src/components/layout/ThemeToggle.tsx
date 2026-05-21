import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useThemeStore } from '@/store/themeStore'

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const theme = useThemeStore((s) => s.theme)
  const toggleTheme = useThemeStore((s) => s.toggleTheme)
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'nav-item nav-item-sidebar flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium',
        className,
      )}
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
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
