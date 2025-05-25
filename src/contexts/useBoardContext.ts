import { useContext } from 'react'

import { BoardContext } from './BoardContext'

export const useBoardContext = () => {
  const ctx = useContext(BoardContext)
  if (!ctx) throw new Error('useBoardContext must be used within BoardProvider')
  return ctx
}
