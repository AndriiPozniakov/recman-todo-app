import { Footer } from '@layoutComponents/Footer'
import { Header } from '@layoutComponents/Header'
import { Sidebar } from '@layoutComponents/Sidebar'

import { BoardPage } from '@/pages/BoardPage'

function App() {
  return (
    <div className="bg-white grid grid-cols-[auto_1fr] text-slate-800">
      <Sidebar />

      <div className="flex h-screen flex-col">
        <Header />

        <main className="flex-1 overflow-auto">
          <BoardPage />
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default App
