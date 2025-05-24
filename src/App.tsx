import { useState } from 'react'

import { useTodoStore } from '@hooks/useTodoStore.ts'

function App() {
  const [title, setTitle] = useState('')
  const { todos, addTodo, removeTodo } = useTodoStore()

  const handleAdd = () => {
    if (title.trim()) {
      addTodo({ title: title.trim() })
      setTitle('')
    }
  }

  return (
    <div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-blue-400"
      />
      <button onClick={handleAdd} style={{ marginRight: 10 }}>
        Add Task
      </button>
      <button onClick={() => setTitle('')}>Clear Input</button>
      <ul className="mt-4">
        {Object.values(todos).map((todo) => (
          <li key={todo.id} style={{ marginBottom: 8 }}>
            {todo.title}
            <button onClick={() => removeTodo(todo.id)} className="ml-4">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
