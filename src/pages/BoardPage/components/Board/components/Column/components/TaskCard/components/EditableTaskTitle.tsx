import { useInput } from '@hooks/useInput.ts'
import { useTaskStore } from '@hooks/useTaskStore.ts'

import type { TTask } from '@/types'

import { EditableTitle } from '@components/EditableTitle.tsx'

interface EditableTaskTitleProps {
  task: TTask
  isEditing: boolean
  onEditingChange: (state: boolean) => void
}

export const EditableTaskTitle = (props: EditableTaskTitleProps) => {
  const { task, isEditing, onEditingChange } = props
  const { value, onChange } = useInput(task.title)

  const { renameTask } = useTaskStore()

  const handleOnBlur = () => {
    if (value.trim() !== '') {
      renameTask(task.id, value)
    }
  }

  return (
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
      allowInternalStateChange={false}
    />
  )
}
