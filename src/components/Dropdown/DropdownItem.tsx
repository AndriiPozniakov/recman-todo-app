import type { ReactNode } from 'react'

import { useDropdownContext } from '@components/Dropdown/DropdownContext.ts'

interface DropdownItemProps {
  index: number
  eventKey: string
  children?: ReactNode
  className?: string
}

export const DropdownItem = (props: DropdownItemProps) => {
  const { index, eventKey, children, className } = props

  const { setOpen, onSelect, activeIndex, listRef, getItemProps } =
    useDropdownContext()

  const handleSelect = () => {
    onSelect?.(eventKey)
    setOpen(false)
  }

  return (
    <button
      {...getItemProps()}
      role="menuitem"
      onClick={handleSelect}
      tabIndex={activeIndex === index ? 0 : -1}
      ref={(node) => {
        listRef.current[index] = node
      }}
      className={className}
    >
      {children}
    </button>
  )
}
