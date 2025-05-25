import { Footer } from '@layoutComponents/Footer'
import { Header } from '@layoutComponents/Header'
import { IconSprite } from '@layoutComponents/IconSprite'
import { Sidebar } from '@layoutComponents/Sidebar'

import { FiltersProvider } from '@/contexts/FiltersProvider'
import { BoardPage } from '@/pages/BoardPage'

function App() {
  return (
    <FiltersProvider>
      <div className="flex h-screen flex-col bg-white text-slate-800">
        <Header />

        <div className="grid flex-grow overflow-hidden lg:grid-cols-[auto_1fr]">
          <Sidebar />

          <main className="overflow-hidden">
            <BoardPage />
          </main>
        </div>

        <Footer />
      </div>

      <IconSprite />
    </FiltersProvider>
  )
}

export default App
