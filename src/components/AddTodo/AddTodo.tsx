import { ChangeEvent, useState, type ReactNode } from "react"
import { useTodoContext } from "../../contexts/TodoContext";
import { validateTodo } from "../../utilities/validation.utilities";

export default function AddTodo() {
  const { todos, addTodo } = useTodoContext();

  const [todoName, setTodoName] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);

  function handleTodoNameChange(newTodoName: string) {
    // Save the user input in the todoName state
    setTodoName(newTodoName)
  }

  function handleAddTodo() {
    // Validate todo element
    const errors = validateTodo({ todoName, todos })

    if (errors.length > 0) {
      setErrors(errors);
      setTodoName('')
      return;
    }

    // Creating the new todo object
    const newTodo = { name: todoName }

    // Send the current todoName to the TodoContext state
    addTodo(newTodo)

    // Reset the todoName state
    setTodoName('');
  }

  let errorResult: ReactNode | null = null
  if (errors) {
    const errorItems = errors.map((error, idx) => (
      <li key={idx}>{error}</li>
    ))
    
    errorResult = <ul>{errorItems}</ul>
  }

  return (
    <section>
      {errorResult}
      <label 
        htmlFor="todo-name"
        data-testid="todo-name-label"
      >Todo name</label>
      <input 
        id="todo-name"
        type="text" 
        name="todo-name"
        autoFocus
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleTodoNameChange(e.target.value)}
        value={todoName}
        data-testid='todo-name-input'
      />
      <button 
        onClick={handleAddTodo}
        data-testid="add-todo-button"
      >Add Todo</button>
    </section>
  )
}