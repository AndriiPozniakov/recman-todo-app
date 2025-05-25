import type { ComponentProps } from 'react'

import { cva, cx } from 'cva'

import { Icon } from '@components/Icon'

interface CheckboxProps
  extends Omit<ComponentProps<'input'>, 'checked' | 'onChange'> {
  checked?: boolean
  onChange?: (checked: boolean) => void
}

const checkboxClassName = cva({
  base: cx(
    'mt-px grid size-4 shrink-0 place-items-center rounded border border-grey-600 duration-150 ease-out',
    'peer-data-checked:border-blue-600 peer-data-checked:bg-blue-600 peer-data-unchecked:peer-hover:border-grey-700 peer-data-unchecked:peer-focus:border-grey-700',
    'peer-disabled:pointer-events-none peer-disabled:opacity-50',
  ),
})

export const Checkbox = (props: CheckboxProps) => {
  const { checked, onChange, disabled } = props

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      onChange?.(!checked)
    }
  }

  return (
    <label
      className="group relative block cursor-pointer"
      onKeyDown={handleKeyDown}
    >
      <input
        type="checkbox"
        data-checked={checked}
        disabled={disabled}
        data-state={checked ? 'checked' : 'unchecked'}
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="peer absolute size-0 select-none opacity-0"
      />
      <span className={checkboxClassName()}>
        {checked && <Icon name="icon-check" className="text-xs text-white" />}
      </span>
    </label>
  )
}
