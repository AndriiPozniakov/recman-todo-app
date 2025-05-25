import { createContext } from 'react'

interface SearchContextType {
  rawQuery: string
  globalSearchQuery: string
  setGlobalSearchQuery: (value: string) => void
}

export const SearchContext = createContext<SearchContextType>({
  rawQuery: '',
  globalSearchQuery: '',
  setGlobalSearchQuery: () => {},
})
