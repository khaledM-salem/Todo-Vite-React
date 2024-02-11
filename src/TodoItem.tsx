import React, { useState } from 'react';

interface TodoItemProps {
  todo: { id: string; title: string, isComplete: boolean };
  onRemove: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
  isCompleted: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onRemove, onEdit, isCompleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleEdit = () => {
    if (newTitle.trim() !== '' && isEditing) {
      onEdit(todo.id, newTitle);
    }
    setIsEditing(!isEditing);
  };
  

  const handleCompleted = (id : string) => {
    if (newTitle.trim() !== '') {
      isCompleted(id);
    }
  };

  return (
    <div style={{
        backgroundColor: '#000000',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        borderRadius: '15px',
        width: '100%',
        height: 100,
        marginTop: 16,
        padding: 16
      }}
    >
      {isEditing &&
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          autoFocus
        />
      }
      <>
        <span>{todo.title}</span>
        <div style={{display: 'flex', justifyContent: 'space-around', rowGap: 100}}>
          <button onClick={() => handleCompleted(todo.id)}>{todo.isComplete ? 'Mark Undo' : 'Mark Completed'}</button>
          <button onClick={() => handleEdit()}>{isEditing ? 'Save' : 'Edit'}</button>
          <button onClick={() => onRemove(todo.id)}>Remove</button>
        </div>
      </>
    </div>
  );
};

export default TodoItem;
