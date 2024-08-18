import { createContext, useState } from "react"

import type { ITodo, ITodoContext, ITodoProvider } from "../../app/types"

export const TodoContext = createContext<ITodoContext | undefined>(undefined)

export default function TodoProvider({ children }: ITodoProvider) {
  const [todos, setTodos] = useState<ITodo[]>([]);

  function addTodo(todo: ITodo) {
    setTodos((prevTodos) => [todo, ...prevTodos])
  }

  function updateTodo(newTodo: ITodo, oldTodo: ITodo) {
    setTodos((prevTodos) => (
      prevTodos.map((todo) => (todo.name === oldTodo.name ? newTodo : todo))
    ))
  }

  return (
    <TodoContext.Provider value={{ 
      todos, 
      addTodo,
      updateTodo,
    }}>
      {children}
    </TodoContext.Provider>
  )
}