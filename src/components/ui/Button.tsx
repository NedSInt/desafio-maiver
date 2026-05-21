import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

function ShadcnButton({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

/** Compat: API legada do MVP (primary → default, danger → destructive) */
type LegacyVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type LegacySize = 'sm' | 'md'

interface LegacyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: LegacyVariant
  size?: LegacySize
}

const legacyVariantMap: Record<LegacyVariant, VariantProps<typeof buttonVariants>['variant']> = {
  primary: 'default',
  secondary: 'outline',
  ghost: 'ghost',
  danger: 'destructive',
}

const legacySizeMap: Record<LegacySize, VariantProps<typeof buttonVariants>['size']> = {
  sm: 'sm',
  md: 'default',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: LegacyButtonProps) {
  return (
    <ShadcnButton
      variant={legacyVariantMap[variant]}
      size={legacySizeMap[size]}
      className={className}
      {...props}
    >
      {children}
    </ShadcnButton>
  )
}

export { ShadcnButton, buttonVariants }
