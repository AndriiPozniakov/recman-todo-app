import {
  type RefObject,
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
  type CSSProperties,
  type HTMLProps,
} from 'react'

import { type ReferenceType } from '@floating-ui/react'

export interface DropdownContextType {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  refs: {
    reference: RefObject<ReferenceType | null>
    floating: RefObject<HTMLElement | null>
    setReference: (node: ReferenceType | null) => void
    setFloating: (node: HTMLElement | null) => void
  }
  activeIndex: number | null
  listRef: RefObject<Array<HTMLElement | null>>
  isMounted: boolean
  floatingStyles: CSSProperties
  floatingRef: RefObject<HTMLElement | null>
  onSelect?: (eventKey: string) => void
  getReferenceProps: (
    userProps?: HTMLProps<HTMLElement>,
  ) => Record<string, unknown>
  getFloatingProps: (
    userProps?: HTMLProps<HTMLElement>,
  ) => Record<string, unknown>
  getItemProps: (userProps?: HTMLProps<HTMLElement>) => Record<string, unknown>
}

export const DropdownContext = createContext<DropdownContextType | null>(null)

export const useDropdownContext = () => {
  const ctx = useContext(DropdownContext)
  if (!ctx) throw new Error('Dropdown components must be wrapped in <Dropdown>')
  return ctx
}
