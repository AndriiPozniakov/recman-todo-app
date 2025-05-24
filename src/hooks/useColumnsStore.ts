import { useAppStore } from '@/store/useAppStore.ts'

export const useColumnsStore = () => {
  const columns = useAppStore((state) => state.columns)
  const columnOrder = useAppStore((state) => state.columnOrder)
  const reorderColumn = useAppStore((state) => state.reorderColumns)

  return { columns, columnOrder, reorderColumn }
}
