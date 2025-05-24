import { useState } from 'react'

interface UseControllableStateProps<T> {
  value?: T
  defaultValue: T
  onChange?: (val: T) => void
}

export const useControllableState = <T>({
  value: controlledValue,
  defaultValue,
  onChange,
}: UseControllableStateProps<T>): [T, (val: T) => void] => {
  const [state, setState] = useState(defaultValue)

  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : state

  const setValue = (val: T) => (isControlled ? onChange?.(val) : setState(val))

  return [value, setValue]
}
