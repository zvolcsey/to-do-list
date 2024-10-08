import { describe, it, expect } from 'vitest';
import { render, screen, userEvent, within } from '../testUtilities/testUtils';
import TodoItem from "../../components/TodoList/TodoItem";


describe('TodoItem component', () => {
  describe('Basic functionality', () => {
    it('displays a completed to-do item', () => {
      // Create a dummy todo
      const todoItem = 'Cleaning the bathroom'

      // Render the "TodoItem" component
      render(<TodoItem data={{ id: new Date().getTime(), isCompleted: true, name: todoItem }}/>)

      // Find the todo items on the screen
      const todoItemElements = screen.queryAllByTestId('todo-item')

      // Check if the todo item element is present in the document
      expect(todoItemElements[0]).toBeInTheDocument()

      // Check if the todo item contains the correct text
      expect(todoItemElements[0]).toHaveTextContent(todoItem)
      
      // Check if the todo item element is visible to the user
      expect(todoItemElements[0]).toHaveClass('tw-pb-8')
      expect(todoItemElements[0]).toHaveClass('last-of-type:tw-p-0')

      // Check that the todo item element does not have classes that would make it invisible
      expect(todoItemElements[0]).not.toHaveClass('tw-hidden')
      expect(todoItemElements[0]).not.toHaveClass('tw-invisible')
      expect(todoItemElements[0]).not.toHaveClass('tw-opacity-0')
      
      // Check if the todo is NOT completed
      expect(within(todoItemElements[0]).getByRole('checkbox')).toBeChecked()

      // Check if the todo name has NOT line-through style
      expect(within(todoItemElements[0]).getByText(todoItem)).toHaveClass('tw-line-through')
    })
    
    it('successfully displays an incompleted to-do item', () => {
      // Create a dummy todo
      const todoItem = 'Cleaning the bathroom'

      // Render the "TodoItem" component
      render(<TodoItem data={{ id: new Date().getTime(), isCompleted: false, name: todoItem }}/>)

      // Find the todo items on the screen
      const todoItemElements = screen.queryAllByTestId('todo-item')

      // Check if the todo item element is present in the document
      expect(todoItemElements[0]).toBeInTheDocument()

      // Check if the todo item contains the correct text
      expect(todoItemElements[0]).toHaveTextContent(todoItem)
      
      // Check if the todo item element is visible to the user
      expect(todoItemElements[0]).toHaveClass('tw-pb-8')
      expect(todoItemElements[0]).toHaveClass('last-of-type:tw-p-0')

      // Check that the todo item element does not have classes that would make it invisible
      expect(todoItemElements[0]).not.toHaveClass('tw-hidden')
      expect(todoItemElements[0]).not.toHaveClass('tw-invisible')
      expect(todoItemElements[0]).not.toHaveClass('tw-opacity-0')
      
      // Check if the todo is NOT completed
      expect(within(todoItemElements[0]).getByRole('checkbox')).not.toBeChecked()

      // Check if the todo name has NOT line-through on the todo name
      expect(within(todoItemElements[0]).getByText(todoItem)).not.toHaveClass('tw-line-through')
    })
  })

  describe('Edit functionality', () => {
    it('exits editing mode successfully when the user clicks cancel button', async () => {
      // Create a dummy todo
      const todoItem = 'Cleaning the bathroom'

      // Render the "TodoItem" component
      render(<TodoItem data={{ id: new Date().getTime(), isCompleted: false, name: todoItem }}/>)

      // Find the todo items on the screen
      const editTodoNameDiv = screen.getByTestId('edit-todo-name')

      await userEvent.click(editTodoNameDiv)

      expect(screen.getByTestId('edit-todo-name-input')).toBeInTheDocument()

      await userEvent.click(screen.getByTestId('edit-cancel-button'))

      expect(screen.getByText(todoItem)).toBeInTheDocument()
    })
  })
})