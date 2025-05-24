import { useColumnsStore } from '@hooks/useColumnsStore.ts'
import { useInput } from '@hooks/useInput.ts'

import { EditableTitle } from '@components/EditableTitle'
import { Icon } from '@components/Icon.tsx'

const DEFAULT_COLUMN_NAME = 'Add section'

export const CreateNewColumn = () => {
  const { addColumn } = useColumnsStore()
  const { value, setValue, onChange } = useInput(DEFAULT_COLUMN_NAME)

  const handleOnFocus = () => {
    setValue('')
  }

  const handleOnBlur = () => {
    setValue(DEFAULT_COLUMN_NAME)

    if (value.trim() === '') return
    addColumn({ title: value })
  }

  return (
    <div className="relative flex w-72 flex-shrink-0">
      <div className="flex flex-grow flex-col gap-4 duration-300 ease-in-out">
        <div className="h-12">
          <EditableTitle
            value={value}
            onChange={onChange}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            fontSize="md"
            weight="medium"
            slotLeftButton={<Icon name="icon-plus" />}
            title="Click to add new column"
          />
        </div>

        <div className="h-full rounded bg-grey-400" />
      </div>
    </div>
  )
}
