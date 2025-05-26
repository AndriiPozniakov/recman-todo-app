import {
  useRef,
  useMemo,
  type ReactNode,
  type SetStateAction,
  type Dispatch,
  useState,
} from 'react'

import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useRole,
  useDismiss,
  useClick,
  useInteractions,
  useListNavigation,
  size,
  useTransitionStyles,
} from '@floating-ui/react'

import { DropdownContext } from './DropdownContext'

interface DropdownProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  children?: ReactNode
  onSelect?: (eventKey: string) => void
}

export const Dropdown = (props: DropdownProps) => {
  const { open, setOpen, onSelect, children } = props

  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const listRef = useRef([])
  const floatingRef = useRef(null)
  const { refs, floatingStyles, context } = useFloating({
    placement: 'bottom-end',
    open,
    onOpenChange: setOpen,
    middleware: [
      offset(8),
      flip(),
      shift(),
      size({
        apply({ availableHeight, elements }) {
          const maxHeight = Math.min(389, availableHeight)

          Object.assign(elements.floating.style, {
            maxHeight: `${maxHeight}px`,
            overflowY: 'auto',
          })
        },
        padding: 16,
      }),
    ],
    whileElementsMounted: autoUpdate,
  })

  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'menu' })
  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
  })
  const { isMounted, styles: transitionsStyles } = useTransitionStyles(
    context,
    {
      duration: 150,
      initial: {
        opacity: 0,
      },
      open: {
        opacity: 1,
      },
    },
  )

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, dismiss, role, listNavigation],
  )

  const value = useMemo(
    () => ({
      open,
      setOpen,
      refs,
      floatingStyles: { ...floatingStyles, ...transitionsStyles },
      floatingRef,
      activeIndex,
      listRef,
      onSelect,
      getReferenceProps,
      getFloatingProps,
      getItemProps,
      isMounted,
    }),
    [
      open,
      setOpen,
      refs,
      floatingStyles,
      transitionsStyles,
      activeIndex,
      onSelect,
      getReferenceProps,
      getFloatingProps,
      getItemProps,
      isMounted,
    ],
  )

  return (
    <DropdownContext.Provider value={value}>
      {children}
    </DropdownContext.Provider>
  )
}
