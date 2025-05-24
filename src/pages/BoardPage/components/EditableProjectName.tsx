import { useInput } from '@hooks/useInput'
import { useProjectStore } from '@hooks/useProjectStore.ts'

import { EditableTitle } from '@components/EditableTitle.tsx'

export const EditableProjectName = () => {
  const { projectTitle, setProjectTitle } = useProjectStore()
  const { value, setValue, onChange } = useInput(projectTitle)

  const handleBlur = () => {
    if (value.trim() !== '' && value !== projectTitle) {
      setProjectTitle(value)

      return
    }

    setValue(projectTitle)
  }

  return (
    <EditableTitle
      as="h1"
      fontSize="xl"
      value={value}
      onBlur={handleBlur}
      onChange={onChange}
      className="w-full max-w-56"
    />
  )
}
