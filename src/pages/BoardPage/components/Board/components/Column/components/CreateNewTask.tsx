import { useEffect, useRef } from 'react'

import { useInput } from '@hooks/useInput.ts'
import { useTaskStore } from '@hooks/useTaskStore.ts'

import { useBoardContext } from '@/contexts/useBoardContext'

import { Input } from '@components/Input'

interface CreateNewTaskProps {
  columnId: string
}

export const CreateNewTask = (props: CreateNewTaskProps) => {
  const { columnId } = props

  const { addTask } = useTaskStore()

  const ref = useRef<HTMLInputElement>(null)

  const { resetNewTaskColumn } = useBoardContext()
  const { value, onChange } = useInput()

  useEffect(() => {
    ref.current?.focus()
  }, [])

  const handleOnBlur = () => {
    if (value.trim() !== '') {
      addTask(columnId, value)
    }

    resetNewTaskColumn()
  }

  return (
    <div className="grid h-[94px] w-full rounded border border-grey-500 bg-white px-4 pb-4 pt-2 text-start">
      <Input
        ref={ref}
        value={value}
        onChange={onChange}
        onBlur={handleOnBlur}
        placeholder="Enter task title"
      />
    </div>
  )
}
