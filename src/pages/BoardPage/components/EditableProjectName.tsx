import { useInput } from '@hooks/useInput'
import { useProjectStore } from '@hooks/useProjectStore'

import { useBoardContext } from '@/contexts/useBoardContext.ts'

import { Button } from '@components/Button.tsx'
import { EditableTitle } from '@components/EditableTitle'
import { Icon } from '@components/Icon'

import { AppOptions } from './AppOptions.tsx'

export const EditableProjectName = () => {
  const { projectTitle, setProjectTitle } = useProjectStore()
  const { value, setValue, onChange } = useInput(projectTitle)

  const { isSelectMode, toggleSelectMode } = useBoardContext()

  const handleBlur = () => {
    if (value.trim() !== '' && value !== projectTitle) {
      setProjectTitle(value)

      return
    }

    setValue(projectTitle)
  }

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-1">
        <Icon
          name="icon-bullseye-arrow"
          className="shrink-0 text-2xl text-blue-600"
        />

        <EditableTitle
          as="h1"
          fontSize="xl"
          value={value}
          onBlur={handleBlur}
          onChange={onChange}
          paddingLeft="xs"
          paddingRight="xs"
          className="w-full max-w-56"
        />
      </div>

      <div className="flex items-center gap-2">
        <AppOptions />

        <Button
          intent="neutral"
          size="sm"
          onClick={toggleSelectMode}
          className="min-w-20"
        >
          {isSelectMode ? 'Cancel' : 'Select'}
        </Button>
      </div>
    </div>
  )
}
