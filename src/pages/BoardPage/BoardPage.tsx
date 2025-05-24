import { Board } from './components/Board'
import { EditableProjectName } from './components/EditableProjectName'

export const BoardPage = () => {
  return (
    <div className="grid h-full grid-rows-[auto_1fr]">
      <div className="flex h-20 items-center border-b border-grey-500 px-8 font-medium">
        <EditableProjectName />
      </div>

      <Board />
    </div>
  )
}
