import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast, { Toaster } from 'react-hot-toast';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { create } from 'zustand';

interface Todo {
  id: string;
  title: string;
  isComplete: boolean;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (title: string) => void;
  removeTodo: (id: string) => void;
  editTodo: (id: string, newTitle: string) => void;
  completeTodo: (id: string) => void;
}

const useStore = create<TodoStore>((set) => ({
  todos: [],
  addTodo: (title) => set((state) => ({ todos: [...state.todos, { id: uuidv4(), title, isComplete: false }] })),
  removeTodo: (id) => set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
  editTodo: (id, newTitle) =>
    set((state) => ({
      todos: state.todos.map((todo) => (todo.id === id ? { ...todo, title: newTitle } : todo)),
    })),
  completeTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) => (todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo)),
    })),
}));

const App: React.FC = () => {
  const { todos, addTodo, removeTodo, editTodo, completeTodo } = useStore();

  const handleAddTodo = (title: string) => {
    addTodo(title);
  };

  const handleRemoveTodo = (id: string) => {
    removeTodo(id);
  };

  const handleEditTodo = (id: string, newTitle: string) => {
    editTodo(id, newTitle);
  };

  const handleAddTodoError = () => {
    toast.error('Task title must be at least 3 characters long');
  };

  const isCompleted = (id: string) => {
    completeTodo(id);
  }

  return (
    <div className='body' style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <h1 style={{textAlign: 'center'}}>Todo App</h1>
      <div style={{width: '100%', maxWidth: 400, padding: 16}}>
        <TodoForm onAdd={handleAddTodo} onAddError={handleAddTodoError} />
        <TodoList
          todos={todos}
          onRemove={handleRemoveTodo}
          onEdit={handleEditTodo}
          isCompleted={isCompleted}
        />
      </div>
      <Toaster />
    </div>
  );
};

export default App;
