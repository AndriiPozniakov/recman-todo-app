import { useState, useEffect, useCallback } from 'react'

export function useDebouncedState<T>(
  initialValue: T,
  delay: number = 300,
): {
  value: T
  debouncedValue: T
  setValue: (val: T) => void
} {
  const [value, setValue] = useState<T>(initialValue)
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  const setValueCallback = useCallback((val: T) => {
    setValue(val)
  }, [])

  return { value, debouncedValue, setValue: setValueCallback }
}
