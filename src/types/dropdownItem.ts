export interface TDropdownItemEntry {
  type?: 'item'
  title: string
  eventKey: string
  iconName?: string
}

export interface TDropdownItemDivider {
  type: 'divider'
}

export type TDropdownItem = TDropdownItemEntry | TDropdownItemDivider
