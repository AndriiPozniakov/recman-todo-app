import { type ComponentProps, type ReactNode, useId } from 'react'

import { cva, cx, type VariantProps } from 'cva'

import { Label } from './Label'
import { OptionalErrorMessage } from './OptionalErrorMessage'

const inputClassName = cva({
  base: cx(
    'h-12 rounded border border-grey-500 bg-white duration-300 ease-out placeholder:text-slate-800/50',
    'min-w-0 hover:border-grey-600',
    'focus-visible:border-blue-600 focus-visible:ring-4 focus-visible:ring-blue-600/25',
    'aria-invalid:border-red-600 aria-invalid:text-red-900 aria-invalid:placeholder:text-red-900/50 aria-invalid:focus-visible:ring-red-600/25',
    'disabled:border-grey-500 disabled:bg-grey-400',
    'read-only:border-grey-500 read-only:bg-grey-400',
  ),
  variants: {
    paddingRight: { lg: 'pr-12', md: 'pr-4', sm: 'pr-2', xs: 'pr-1' },
    paddingLeft: { lg: 'pl-12', md: 'pl-4', sm: 'pl-2', xs: 'pl-1' },
    // isSlotRight: {
    //   true: 'pr-12',
    //   false: 'pr-4',
    // },
    // isSlotLeft: {
    //   true: 'pl-12',
    //   false: 'pl-4',
    // },
    fontSize: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      xl: 'text-xl',
    },
    weight: {
      medium: 'font-medium',
    },
  },
  defaultVariants: {
    // isSlotRight: false,
    // isSlotLeft: false,
    paddingLeft: 'md',
    paddingRight: 'md',
    fontSize: 'sm',
  },
})

interface InputProps
  extends ComponentProps<'input'>,
    VariantProps<typeof inputClassName> {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  slotRight?: ReactNode
  slotLeft?: ReactNode
  showErrorMessage?: boolean
}

export const Input = (props: InputProps) => {
  const {
    className,
    id: idProp,
    label,
    hint,
    error,
    slotRight,
    slotLeft,
    showErrorMessage = true,
    fontSize,
    weight,
    paddingRight,
    paddingLeft,
    ...rest
  } = props

  const fallbackId = useId()
  const id = idProp || `input-${fallbackId}`

  const errorElementId = `error-element-${useId()}`

  return (
    <div className={cx('grid items-start', className)}>
      {!!label && (
        <Label htmlFor={id} className="pb-1 font-medium">
          {label}
        </Label>
      )}
      <div className="relative grid">
        <input
          {...rest}
          id={id}
          className={inputClassName({
            // isSlotLeft: !!slotLeft,
            // isSlotRight: !!slotRight,
            paddingLeft: paddingLeft ?? (slotLeft ? 'lg' : 'md'),
            paddingRight: paddingRight ?? (slotRight ? 'lg' : 'md'),
            fontSize,
            weight,
          })}
          onKeyDown={(e) => {
            if (['Enter'].includes(e.key)) {
              e.preventDefault()
              e.currentTarget.blur()
            }
          }}
          aria-invalid={!!error}
          aria-describedby={error ? errorElementId : undefined}
        />
        {!!slotLeft && (
          <div className="absolute left-4 top-1/2 flex -translate-y-1/2 gap-4 text-slate-800/50">
            {slotLeft}
          </div>
        )}
        {!!slotRight && (
          <div className="absolute right-4 top-1/2 flex -translate-y-1/2 gap-4 text-slate-800/50">
            {slotRight}
          </div>
        )}
      </div>
      {showErrorMessage && (
        <OptionalErrorMessage
          id={errorElementId}
          error={error}
          className="mt-1"
        />
      )}
      {!!hint && <span className="mt-1 text-slate-800/50">{hint}</span>}
    </div>
  )
}
