import { type ComponentProps } from 'react'

import { cx } from 'cva'

type CopyrightProps = ComponentProps<'div'>

const currentYear = new Date().getFullYear()

export const Copyright = (props: CopyrightProps) => {
  const { className, ...rest } = props

  return (
    <div {...rest} className={cx('text-sm text-slate-800/50', className)}>
      &copy; Todo List {currentYear}
    </div>
  )
}
