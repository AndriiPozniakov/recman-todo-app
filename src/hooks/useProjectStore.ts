import { useAppStore } from '@/store/useAppStore.ts'

export const useProjectStore = () => {
  const projectTitle = useAppStore((state) => state.projectTitle)
  const setProjectTitle = useAppStore((state) => state.setProjectTitle)

  return { projectTitle, setProjectTitle }
}
