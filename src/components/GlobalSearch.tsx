import type { ChangeEvent } from 'react'

import { useSearchContext } from '@/contexts/useSearchContext'

import { Icon } from '@components/Icon'
import { Input } from '@components/Input'

export const GlobalSearch = () => {
  const { rawQuery, setGlobalSearchQuery } = useSearchContext()

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setGlobalSearchQuery(value)
  }

  return (
    <Input
      placeholder="Search..."
      slotRight={<Icon name="icon-magnifying-glass" />}
      value={rawQuery}
      onChange={handleOnChange}
      className="w-full lg:max-w-80"
    />
  )
}
