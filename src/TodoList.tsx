import React from 'react';
import TodoItem from './TodoItem';

interface Todo {
  id: string;
  title: string;
  isComplete: boolean; 
}

interface TodoListProps {
  todos: Todo[];
  onRemove: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
  isCompleted: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onRemove, onEdit, isCompleted }) => {
  return (
    <>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onRemove={onRemove} onEdit={onEdit} isCompleted={isCompleted} />
      ))}
    </>
  );
};

export default TodoList;
