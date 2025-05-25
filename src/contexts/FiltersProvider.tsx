import { useMemo, type PropsWithChildren, useState, useCallback } from 'react'

import { useDebouncedState } from '@/hooks/useDebouncedState'

import type { StatusFilter } from '@/types/statusFilter'

import { FiltersContext } from './FiltersContext'

export const FiltersProvider = ({ children }: PropsWithChildren) => {
  const {
    value: rawQuery,
    debouncedValue: globalSearchQuery,
    setValue: setRawQuery,
  } = useDebouncedState('')

  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  const toggleStatusFilter = useCallback((value: StatusFilter) => {
    setStatusFilter((prev) => (prev === value ? 'all' : value))
  }, [])

  const value = useMemo(
    () => ({
      globalSearchQuery,
      setGlobalSearchQuery: setRawQuery,
      rawQuery,
      statusFilter,
      toggleStatusFilter,
    }),
    [
      statusFilter,
      toggleStatusFilter,
      globalSearchQuery,
      setRawQuery,
      rawQuery,
    ],
  )

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  )
}
