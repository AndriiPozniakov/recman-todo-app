import { Footer } from '@layoutComponents/Footer.tsx'
import { Header } from '@layoutComponents/Header.tsx'
import { Sidebar } from '@layoutComponents/Sidebar.tsx'

import { TodoListPage } from '@/pages/TodoListPage.tsx'

function App() {
  return (
    <div className="grid grid-cols-[auto_1fr]">
      <Sidebar />

      <div className="flex h-screen flex-col">
        <Header />

        <main className="flex-1 overflow-auto">
          <TodoListPage />
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default App
