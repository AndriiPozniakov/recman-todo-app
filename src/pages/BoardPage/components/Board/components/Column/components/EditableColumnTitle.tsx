import { type ComponentProps, useState } from 'react'

import { useColumnsStore } from '@hooks/useColumnsStore'
import { useInput } from '@hooks/useInput'
import { cx } from 'cva'

import type { TDropdownItem } from '@/types/dropdownItem.ts'

import type { TColumnWithTasks } from '@/types'

import { DropdownMenu } from '@components/DropdownMenu.tsx'
import { EditableTitle } from '@components/EditableTitle'
import { Icon } from '@components/Icon.tsx'

interface EditColumnTitleProps extends ComponentProps<'div'> {
  column: TColumnWithTasks
}

const MENU_ITEMS_BASE: TDropdownItem[] = [
  { eventKey: 'rename', title: 'Rename section', iconName: 'icon-pen' },
  { type: 'divider' },
]

const MENU_ITEMS_HAS_TASKS: TDropdownItem[] = [
  ...MENU_ITEMS_BASE,
  {
    eventKey: 'delete-with-tasks',
    title: 'Delete section with tasks',
  },
  {
    eventKey: 'delete-move-tasks',
    title: 'Delete section and move tasks',
  },
]

const MENU_ITEMS_NO_TASKS: TDropdownItem[] = [
  ...MENU_ITEMS_BASE,
  {
    eventKey: 'delete-with-tasks',
    title: 'Delete section',
  },
]

export const EditableColumnTitle = (props: EditColumnTitleProps) => {
  const { ref, column, className, ...rest } = props
  const { renameColumn, removeColumnAndMoveTasks, removeColumnWithTasks } =
    useColumnsStore()

  const { value, setValue, onChange } = useInput(column.title)
  const [isEditing, setIsEditing] = useState(false)

  const handleBlur = () => {
    if (value.trim() !== '' && value !== column.title) {
      renameColumn(column.id, value)

      return
    }

    setValue(column.title)
  }

  const handleMenuItemSelect = (eventKey: string) => {
    switch (eventKey) {
      case 'rename':
        setIsEditing(true)
        break
      case 'delete-with-tasks':
        removeColumnWithTasks(column.id)
        break
      case 'delete-move-tasks':
        removeColumnAndMoveTasks(column.id)
        break
    }
  }

  const taskCount = column.tasks.length

  const menuItems = taskCount > 0 ? MENU_ITEMS_HAS_TASKS : MENU_ITEMS_NO_TASKS

  return (
    <div
      {...rest}
      ref={ref}
      className={cx(
        'flex h-12 shrink-0 items-center justify-between gap-2 rounded border border-grey-500 bg-grey-400 pr-4',
        className,
      )}
    >
      <EditableTitle
        isEditing={isEditing}
        onEditingChange={setIsEditing}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        fontSize="md"
        weight="medium"
        className="-ml-px"
      />

      <div className="flex items-center gap-2">
        <div className="text-slate-800/50">{taskCount}</div>

        <DropdownMenu
          triggerContent={<Icon name="icon-three-dots" />}
          menuItems={menuItems}
          onSelect={handleMenuItemSelect}
        />
      </div>
    </div>
  )
}
