import { useAppStore } from '@/store/useAppStore.ts'

export const useTaskStore = () => {
  const tasks = useAppStore((state) => state.tasks)
  const addTask = useAppStore((state) => state.addTask)
  const removeTask = useAppStore((state) => state.removeTask)

  return { tasks, addTask, removeTask }
}
