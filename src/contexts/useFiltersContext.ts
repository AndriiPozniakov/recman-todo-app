import { useContext } from 'react'

import { FiltersContext } from './FiltersContext'

export const useFiltersContext = () => {
  const ctx = useContext(FiltersContext)
  if (!ctx)
    throw new Error('useFiltersContext must be used within FiltersProvider')
  return ctx
}
