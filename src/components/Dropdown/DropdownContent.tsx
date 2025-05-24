import type { ReactNode } from 'react'

import { FloatingPortal } from '@floating-ui/react'

import { useDropdownContext } from './DropdownContext'

interface DropdownContentProps {
  children?: ReactNode
  className?: string
}

export const DropdownContent = (props: DropdownContentProps) => {
  const { children, className } = props
  const { isMounted, refs, floatingStyles, getFloatingProps } =
    useDropdownContext()

  return (
    isMounted && (
      <FloatingPortal>
        <div
          {...getFloatingProps()}
          ref={refs.setFloating}
          style={floatingStyles}
          role="menu"
          className={className}
        >
          {children}
        </div>
      </FloatingPortal>
    )
  )
}
