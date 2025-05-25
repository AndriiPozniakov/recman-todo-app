import { useColumnsStore } from '@hooks/useColumnsStore.ts'
import { useTaskStore } from '@hooks/useTaskStore.ts'

import type { TDropdownItem } from '@/types/dropdownItem.ts'

import { useBoardContext } from '@/contexts/useBoardContext.ts'
import { useFiltersContext } from '@/contexts/useFiltersContext.ts'

import { DropdownMenu } from '@components/DropdownMenu'
import { Icon } from '@components/Icon'

const COMPLETED_EVENT_KEY = 'completed'
const UNCOMPLETED_EVENT_KEY = 'incomplete'

export const AppOptions = () => {
  const { columnOrder } = useColumnsStore()
  const { removeBulkTasks } = useTaskStore()

  const { statusFilter, toggleStatusFilter } = useFiltersContext()
  const { selectedTasks, clearSelectedTasks, createNewTask } = useBoardContext()

  const menuItems: TDropdownItem[] = [
    { eventKey: 'add-new-task', title: 'Add new task', iconName: 'icon-plus' },
    { type: 'divider' },
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
    { type: 'divider' },
    { eventKey: 'delete-all-selected', title: 'Remove all selected tasks' },
  ]

  const handleOnSelect = (eventKey: string) => {
    switch (eventKey) {
      case 'add-new-task':
        {
          const firstColumnId = columnOrder[0]
          if (!firstColumnId) return

          createNewTask(firstColumnId)
        }
        break
      case 'completed':
      case 'incomplete':
        toggleStatusFilter(eventKey)
        break
      case 'delete-all-selected':
        removeBulkTasks(selectedTasks)
        clearSelectedTasks()
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
