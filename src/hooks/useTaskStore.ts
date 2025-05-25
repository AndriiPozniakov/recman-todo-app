import { useAppStore } from '@/store/useAppStore'

export const useTaskStore = () => {
  const tasks = useAppStore((state) => state.tasks)
  const addTask = useAppStore((state) => state.addTask)
  const removeTask = useAppStore((state) => state.removeTask)
  const toggleComplete = useAppStore((state) => state.toggleComplete)

  return { tasks, addTask, removeTask, toggleComplete }
}
