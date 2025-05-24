import { Icon } from '@components/Icon'
import { Input } from '@components/Input'

export const Header = () => {
  return (
    <header className="grid h-20 grid-cols-[auto_1fr] border-b border-grey-500">
      {/* TODO: Implement clickable logo that redirects to the main page */}
      <div className="flex w-64 items-center border-r border-grey-500 px-8 text-xl font-medium">
        <a href="/" className="-m-4 p-4">
          Todo<span className="text-blue-600">App.</span>
        </a>
      </div>

      <div className="flex items-center px-8">
        <Input
          placeholder="Search..."
          slotRight={<Icon name="icon-magnifying-glass" />}
          className="w-full max-w-80"
        />
      </div>
    </header>
  )
}
