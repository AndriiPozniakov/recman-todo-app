import type { ComponentProps } from 'react'

type LabelProps = ComponentProps<'label'>

export const Label = (props: LabelProps) => {
  const { children, ...rest } = props

  return <label {...rest}>{children}</label>
}
