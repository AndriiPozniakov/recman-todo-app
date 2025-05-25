import { useMemo } from 'react'

import Fuse, { type FuseOptionKey, type IFuseOptions } from 'fuse.js'

interface UseFuseSearchParams<T> {
  list: T[]
  search: string
  keys: FuseOptionKey<T>[]
  options?: IFuseOptions<T>
}

export function useFuseSearch<T>({
  list,
  search,
  keys,
  options,
}: UseFuseSearchParams<T>): T[] {
  const fuse = useMemo(() => {
    return new Fuse(list, {
      keys,
      threshold: 0.3,
      ignoreLocation: true,
      ...options,
    })
  }, [list, keys, options])

  const result = useMemo(() => {
    if (!search.trim()) return list
    return fuse.search(search).map(({ item }) => item)
  }, [fuse, search, list])

  return result
}
