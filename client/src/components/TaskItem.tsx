/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';

interface TaskItemProps {
  item: { id: number; todo: string };
  handleSave: (id: number, editedTodo: string) => void;
  handleDelete: (id: number) => void;
}

function TaskItem({ item, handleSave, handleDelete }: TaskItemProps) {
  const textStyle = css({
    fontSize: 15,
    padding: '0.4em 0.3em',
  });

  const inputStyle = css(textStyle, {
    color: '#5d4d41',
    borderRadius: 4,
    border: '1px solid #DAA06D',
    backgroundColor: '#EADDCA',
    outline: 'none',
    width: '100%',
    marginRight: 3,
  });

  const lsStyle = css({
    display: 'flex',
    alignItems: 'center',
    color: '#766354',
    marginBottom: 4,
  });

  const spanStyle = css(textStyle, {
    width: '100%',
    textAlign: 'start',
    marginRight: 3,
  });

  const buttonStyle = css({
    backgroundColor: '#DAA06D',
    color: '#FFF',
    border: 'none',
    borderRadius: 3,
    fontSize: 15,
    cursor: 'pointer',
    transition: 'opacity 0.15s ease',
    '&:hover': { opacity: 0.8 },
    margin: 3,
  })

  const removeStyle = css(buttonStyle, {
    padding: '0.8ex 3ex',
  });

  const editStyle = css(buttonStyle, {
    padding: '0.8ex 2ex',
  });

  const [editedTodo, setEditedTodo] = useState(item.todo);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTodo(item.todo);
  };

  const saveEdit = () => {
    if (editedTodo.trim() !== '') {
      handleSave(item.id, editedTodo);
    }
    setIsEditing(false);
  };

  return (
    <li key={item.id}>
      {isEditing ? (
        <div css={lsStyle}>
          <input
            type="text"
            value={editedTodo}
            onChange={(e) => setEditedTodo(e.target.value)}
            css={inputStyle}
          />
          <button onClick={saveEdit} css={editStyle}>Save</button>
          <button onClick={handleCancel} css={editStyle}>Cancel</button>
        </div>
      ) : (
        <div css={lsStyle}>
          <span onClick={handleEdit} css={spanStyle}>
            {item.todo}
          </span>
          <button onClick={() => handleDelete(item.id)} css={removeStyle}>
            Remove
          </button>
        </div>
      )}
    </li>
  );
}

export default TaskItem;
