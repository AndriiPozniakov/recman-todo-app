import type { ReactNode } from 'react'

import { useDropdownContext } from './DropdownContext.ts'

interface DropdownTriggerProps {
  children?: ReactNode
  className?: string
}

export const DropdownTrigger = (props: DropdownTriggerProps) => {
  const { children, className } = props
  const { refs, setOpen, getReferenceProps } = useDropdownContext()

  return (
    <button
      {...getReferenceProps()}
      ref={refs.setReference}
      onClick={() => setOpen((prev) => !prev)}
      aria-haspopup="menu"
      className={className}
    >
      {children}
    </button>
  )
}
