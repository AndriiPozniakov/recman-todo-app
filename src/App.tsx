import { Footer } from '@layoutComponents/Footer'
import { Header } from '@layoutComponents/Header'
import { Sidebar } from '@layoutComponents/Sidebar'

import { BoardPage } from '@/pages/BoardPage'

function App() {
  return (
    <div className="flex h-screen flex-col bg-white text-slate-800">
      <Header />

      <div className="grid flex-1 grid-cols-[auto_1fr]">
        <Sidebar />

        <main className="overflow-auto">
          <BoardPage />
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default App
