import { GlobalSearch } from './components/GlobalSearch'

export const Header = () => {
  return (
    <header className="grid h-20 shrink-0 grid-cols-[auto_1fr] border-b border-grey-500">
      {/* TODO: Implement clickable logo that redirects to the main page */}
      <div className="flex items-center border-grey-500 px-4 text-xl font-medium md:w-64 md:border-r md:px-8">
        <a href="/" className="-m-4 p-4">
          Todo<span className="text-blue-600">App.</span>
        </a>
      </div>

      <div className="flex items-center px-4 md:px-8">
        <GlobalSearch />
      </div>
    </header>
  )
}
