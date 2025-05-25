import type { TDropdownItem } from '@/types/dropdownItem.ts'

import { useFiltersContext } from '@/contexts/useFiltersContext.ts'

import { DropdownMenu } from '@components/DropdownMenu'
import { Icon } from '@components/Icon'

const COMPLETED_EVENT_KEY = 'completed'
const UNCOMPLETED_EVENT_KEY = 'incomplete'

export const AppOptions = () => {
  const { statusFilter, toggleStatusFilter } = useFiltersContext()

  const menuItems: TDropdownItem[] = [
    {
      eventKey: 'completed',
      title: 'Filter completed',
      iconName: statusFilter === COMPLETED_EVENT_KEY ? 'icon-check' : undefined,
    },
    {
      eventKey: 'incomplete',
      title: 'Filter incomplete',
      iconName:
        statusFilter === UNCOMPLETED_EVENT_KEY ? 'icon-check' : undefined,
    },
  ]

  const handleOnSelect = (eventKey: string) => {
    switch (eventKey) {
      case 'completed':
      case 'incomplete':
        toggleStatusFilter(eventKey)
        break
    }
  }

  return (
    <DropdownMenu
      triggerContent={<Icon name="icon-gear" />}
      onSelect={handleOnSelect}
      menuItems={menuItems}
    />
  )
}
