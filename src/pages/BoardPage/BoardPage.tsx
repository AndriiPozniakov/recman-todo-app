import { Board } from './components/Board'

export const BoardPage = () => {
  return (
    <div className="grid h-full grid-rows-[auto_1fr]">
      <h1 className="border-b border-grey-500 px-8 py-4 text-xl font-medium">
        Todo List
      </h1>

      <Board />
    </div>
  )
}
