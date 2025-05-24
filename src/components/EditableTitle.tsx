import {
  type ComponentProps,
  type ElementType,
  type FocusEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'

import { cva, cx } from 'cva'

import { Input } from './Input'

interface EditableTitleProps<T extends ElementType>
  extends ComponentProps<typeof Input> {
  as?: T
  slotLeftButton?: ReactNode
  textClassName?: string
}

const contentClassName = cva({
  base: 'group flex h-12 overflow-hidden',
  variants: {
    fontSize: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      xl: 'text-xl',
    },
    weight: {
      medium: 'font-medium',
    },
  },
  defaultVariants: {
    fontSize: 'sm',
  },
})

const buttonClassName = cva({
  base: 'flex size-full items-center justify-start gap-2 text-nowrap rounded border border-transparent px-4 duration-300 ease-in-out group-hover:border-grey-600',
  variants: {
    paddingRight: { lg: 'pr-12', md: 'pr-4', sm: 'pr-2', xs: 'pr-1' },
    paddingLeft: { lg: 'pl-12', md: 'pl-4', sm: 'pl-2', xs: 'pl-1' },
  },
})

export const EditableTitle = <T extends ElementType = 'h2'>(
  props: EditableTitleProps<T>,
) => {
  const {
    as: Component = 'h2',
    title = 'Click to edit',
    value,
    onBlur,
    fontSize,
    weight,
    slotLeftButton,
    paddingRight,
    paddingLeft,
    className,
    textClassName,
    ...rest
  } = props

  const inputRef = useRef<HTMLInputElement>(null)

  const inputId = useId()
  const [isEditing, setIsEditing] = useState(false)

  const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsEditing(false)
    onBlur?.(e)
  }

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
    }
  }, [isEditing])

  return isEditing ? (
    <Input
      id={inputId}
      ref={inputRef}
      autoFocus
      onBlur={handleOnBlur}
      value={value}
      fontSize={fontSize}
      weight={weight}
      paddingRight={paddingRight}
      paddingLeft={paddingLeft}
      className={className}
      {...rest}
    />
  ) : (
    <Component className={contentClassName({ fontSize, weight, className })}>
      <button
        type="button"
        title={title}
        aria-label={title}
        aria-controls={inputId}
        aria-expanded={isEditing}
        onClick={() => setIsEditing(true)}
        className={buttonClassName({ paddingRight, paddingLeft })}
      >
        {slotLeftButton}
        <span className={cx('truncate', textClassName)}>{value}</span>
      </button>
    </Component>
  )
}
