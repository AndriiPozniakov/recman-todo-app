import { type ComponentProps, type ReactNode } from 'react'

import { cx } from 'cva'

interface OptionalErrorMessageProps extends ComponentProps<'div'> {
  error?: ReactNode
}

export const OptionalErrorMessage = ({
  error,
  className,
  ...rest
}: OptionalErrorMessageProps) => {
  if (!error) return null

  return (
    <div {...rest} className={cx('text-red-600', className)} role="alert">
      {error}
    </div>
  )
}
