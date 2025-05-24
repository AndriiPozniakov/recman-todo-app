import { useColumnsStore } from '@hooks/useColumnsStore'
import { useInput } from '@hooks/useInput'

import { EditableTitle } from '@components/EditableTitle'
import { Icon } from '@components/Icon'

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
    <div className="relative flex w-72 flex-shrink-0 px-2 pb-8">
      <div className="flex flex-grow flex-col gap-4 duration-300 ease-in-out">
        <div>
          <EditableTitle
            value={value}
            onChange={onChange}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            fontSize="md"
            weight="medium"
            paddingLeft="sm"
            paddingRight="sm"
            slotLeftButton={
              <div className="grid size-5 place-items-center rounded-full border-2 border-blue-600">
                <Icon name="icon-plus" className="text-blue-600" />
              </div>
            }
            title="Click to add new column"
            textClassName="text-blue-600"
          />
        </div>

        <div className="h-full rounded bg-grey-400" />
      </div>
    </div>
  )
}
