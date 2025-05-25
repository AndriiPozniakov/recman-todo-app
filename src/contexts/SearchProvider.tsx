import { useMemo, type PropsWithChildren } from 'react'

import { useDebouncedState } from '@/hooks/useDebouncedState'

import { SearchContext } from './SearchContext'

export const SearchProvider = ({ children }: PropsWithChildren) => {
  const {
    value: rawQuery,
    debouncedValue: globalSearchQuery,
    setValue: setRawQuery,
  } = useDebouncedState('')

  const value = useMemo(
    () => ({
      globalSearchQuery,
      setGlobalSearchQuery: setRawQuery,
      rawQuery,
    }),
    [globalSearchQuery, setRawQuery, rawQuery],
  )

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  )
}
