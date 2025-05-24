import { type ReactNode, useState } from 'react'

import { cx } from 'cva'

import type { TDropdownItem, TDropdownItemEntry } from '@/types/dropdownItem.ts'

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from '@components/Dropdown'
import { Icon } from '@components/Icon.tsx'

interface DropdownMenuProps {
  triggerContent: ReactNode
  menuItems: TDropdownItem[]
  onSelect?: (eventKey: string) => void
}

const isDropdownItemEntry = (
  item: TDropdownItem,
): item is TDropdownItemEntry => {
  return item.type !== 'divider'
}

export const DropdownMenu = (props: DropdownMenuProps) => {
  const { onSelect, triggerContent, menuItems } = props
  const [open, setOpen] = useState(false)

  return (
    <Dropdown open={open} setOpen={setOpen} onSelect={onSelect}>
      <DropdownTrigger
        className={cx(
          'rounded p-2 duration-300 ease-in-out',
          open ? 'bg-grey-600' : 'hocus:bg-grey-600',
        )}
      >
        {triggerContent}
      </DropdownTrigger>
      <DropdownContent className="z-dropdown overflow-auto rounded border border-grey-500 bg-white outline-none">
        {menuItems.map((item, index) => {
          if (isDropdownItemEntry(item)) {
            const { eventKey, title, iconName } = item

            return (
              <DropdownItem
                key={eventKey}
                index={index}
                eventKey={eventKey}
                className={cx(
                  'flex h-12 w-full items-center gap-2 px-4 text-sm outline-none duration-300 ease-in-out hocus:bg-grey-400',
                  {
                    'text-red-600': eventKey.includes('delete'),
                  },
                )}
              >
                {iconName && <Icon name={iconName} className="text-base" />}
                {title}
              </DropdownItem>
            )
          }

          return <hr key={`divider-${index}`} className="text-grey-500" />
        })}
      </DropdownContent>
    </Dropdown>
  )
}
