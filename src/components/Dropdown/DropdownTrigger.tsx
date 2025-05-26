import type { ComponentProps, ReactNode } from 'react'

import { useDropdownContext } from './DropdownContext'

interface DropdownTriggerProps extends ComponentProps<'button'> {
  children?: ReactNode
  className?: string
}

export const DropdownTrigger = (props: DropdownTriggerProps) => {
  const { title, children, className, ...rest } = props
  const { refs, setOpen, getReferenceProps } = useDropdownContext()

  return (
    <button
      {...rest}
      {...getReferenceProps()}
      ref={refs.setReference}
      title={title}
      aria-label={title}
      onClick={() => setOpen((prev) => !prev)}
      aria-haspopup="menu"
      className={className}
    >
      {children}
    </button>
  )
}
