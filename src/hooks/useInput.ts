import { type ChangeEvent, useState } from 'react'

export const useInput = (initial = '') => {
  const [value, setValue] = useState(initial)
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value)

  return { value, onChange, setValue }
}
