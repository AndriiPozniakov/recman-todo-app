import { createContext } from 'react'

import type { StatusFilter } from '@/types/statusFilter'

interface FiltersContextType {
  rawQuery: string
  globalSearchQuery: string
  setGlobalSearchQuery: (value: string) => void
  statusFilter: StatusFilter
  toggleStatusFilter: (value: StatusFilter) => void
}

export const FiltersContext = createContext<FiltersContextType>({
  rawQuery: '',
  globalSearchQuery: '',
  setGlobalSearchQuery: () => {},
  statusFilter: 'all',
  toggleStatusFilter: () => {},
})
