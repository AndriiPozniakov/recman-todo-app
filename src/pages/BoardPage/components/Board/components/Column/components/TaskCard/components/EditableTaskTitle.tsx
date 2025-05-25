import { useInput } from '@hooks/useInput.ts'
import { useTaskStore } from '@hooks/useTaskStore.ts'

import { useSearchContext } from '@/contexts/useSearchContext.ts'
import type { TTask } from '@/types'

import { EditableTitle } from '@components/EditableTitle.tsx'
import { Highlight } from '@components/Highlight.tsx'

interface EditableTaskTitleProps {
  task: TTask
  isEditing: boolean
  onEditingChange: (state: boolean) => void
}

export const EditableTaskTitle = (props: EditableTaskTitleProps) => {
  const { task, isEditing, onEditingChange } = props
  const { value, onChange } = useInput(task.title)

  const { renameTask } = useTaskStore()
  const { globalSearchQuery } = useSearchContext()

  const handleOnBlur = () => {
    if (value.trim() !== '') {
      renameTask(task.id, value)
    }
  }

  return isEditing ? (
    <EditableTitle
      as="h3"
      weight="medium"
      fontSize="md"
      paddingRight="xs"
      paddingLeft="xs"
      isEditing={isEditing}
      onEditingChange={onEditingChange}
      onChange={onChange}
      value={value}
      onBlur={handleOnBlur}
    />
  ) : (
    <h3 className="truncate px-[5px] py-3 font-medium">
      <Highlight text={value} query={globalSearchQuery} />
    </h3>
  )
}
