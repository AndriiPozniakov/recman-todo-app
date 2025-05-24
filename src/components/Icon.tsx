import { type ComponentPropsWithoutRef } from 'react'

const paramToArray = (param: number | [number, number] | string) =>
  typeof param === 'object' ? param : [param, param]

interface IconPropTypes extends ComponentPropsWithoutRef<'svg'> {
  name: string
  size?: number | [number, number] | string
  iconSpritePath?: string
}

export const Icon = ({
  name,
  size = '1em',
  iconSpritePath = '',
  ...rest
}: IconPropTypes) => {
  const sizes = paramToArray(size)
  return (
    <svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      width={sizes[0]}
      height={sizes[1]}
      fill="currentColor"
    >
      <use xlinkHref={`${iconSpritePath}#${name}`} />
    </svg>
  )
}
