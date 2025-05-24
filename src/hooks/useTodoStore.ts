import { useAppStore } from '@/store/useAppStore.ts'

export const useTodoStore = () => {
  const todos = useAppStore((state) => state.todos)
  const addTodo = useAppStore((state) => state.addTodo)
  const removeTodo = useAppStore((state) => state.removeTodo)

  return { todos, addTodo, removeTodo }
}
