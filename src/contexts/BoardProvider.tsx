import { type PropsWithChildren, useCallback, useMemo, useState } from 'react'

import { BoardContext } from './BoardContext'

export const BoardProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isSelectMode, setIsSelectMode] = useState(false)

  const handleToggleSelectMode = useCallback(
    () => setIsSelectMode((prev) => !prev),
    [setIsSelectMode],
  )

  const value = useMemo(
    () => ({
      isSelectMode,
      toggleSelectMode: handleToggleSelectMode,
    }),
    [isSelectMode, handleToggleSelectMode],
  )

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
}
