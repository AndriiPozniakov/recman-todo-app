import { Board } from './components/Board'

export const BoardPage = () => {
  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-8 p-8">
      <h1 className="text-xl font-medium">Todo List</h1>

      <Board />
    </div>
  )
}
