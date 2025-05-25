import { BoardProvider } from '@/contexts/BoardProvider.tsx'

import { Board } from './components/Board'
import { EditableProjectName } from './components/EditableProjectName'

export const BoardPage = () => {
  return (
    <BoardProvider>
      <div className="grid h-full grid-rows-[auto_1fr] overflow-hidden">
        <div className="flex h-20 items-center border-b border-grey-500 px-4 font-medium md:px-8">
          <EditableProjectName />
        </div>

        <Board />
      </div>
    </BoardProvider>
  )
}
