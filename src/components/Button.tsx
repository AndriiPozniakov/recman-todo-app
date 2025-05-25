import { type ComponentProps } from 'react'

import { cva, type VariantProps } from 'cva'

const buttonClassName = cva({
  base: 'button leading-default flex items-center justify-center gap-2 rounded duration-300 ease-out disabled:pointer-events-none disabled:opacity-50',
  variants: {
    intent: {
      primary: 'bg-green-600 hocus:bg-green-500',
      danger: 'hocus:bg-red-500 bg-red-600',
      neutral:
        'bg-grey-500 text-slate-800/75 hocus:bg-grey-600 hocus:text-slate-800',
    },
    size: {
      sm: 'h-8 px-2 text-xs',
      md: 'h-10',
      lg: 'h-12',
    },
  },
  compoundVariants: [
    {
      intent: ['primary', 'danger'],
      className: 'text-white',
    },
    {
      size: ['md', 'lg'],
      className: 'px-4 text-sm',
    },
  ],
  defaultVariants: {
    intent: 'primary',
    size: 'lg',
  },
})

type ButtonProps = VariantProps<typeof buttonClassName> &
  ComponentProps<'button'>

export const Button = (props: ButtonProps) => {
  const { intent, size, children, className, disabled, ...rest } = props

  return (
    <button
      {...rest}
      type="button"
      className={buttonClassName({ intent, size, className })}
      disabled={disabled}
    >
      <span>{children}</span>
    </button>
  )
}
