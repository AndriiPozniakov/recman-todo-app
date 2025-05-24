import { useAppStore } from '@/store/useAppStore'

export const useProjectStore = () => {
  const projectTitle = useAppStore((state) => state.projectTitle)
  const setProjectTitle = useAppStore((state) => state.setProjectTitle)

  return { projectTitle, setProjectTitle }
}
