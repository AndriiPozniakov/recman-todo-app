import type { ComponentProps } from 'react'

import { useColumnsStore } from '@hooks/useColumnsStore'
import { useInput } from '@hooks/useInput'
import { cx } from 'cva'

import type { TColumnWithTasks } from '@/types'

import { EditableTitle } from '@components/EditableTitle'

interface EditColumnTitleProps extends ComponentProps<'div'> {
  column: TColumnWithTasks
}

export const EditableColumnTitle = (props: EditColumnTitleProps) => {
  const { ref, column, className, ...rest } = props
  const { renameColumn } = useColumnsStore()

  const { value, setValue, onChange } = useInput(column.title)

  const handleBlur = () => {
    if (value.trim() !== '' && value !== column.title) {
      renameColumn(column.id, value)

      return
    }

    setValue(column.title)
  }

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
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        fontSize="md"
        weight="medium"
        className="-ml-px"
      />
      <span className="text-slate-800/50">{column.tasks.length}</span>
    </div>
  )
}
