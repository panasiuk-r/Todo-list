import React from 'react';

import TaskItem from './TaskItem';
import TodosState from '../types/TodosState';

interface TaskListProps {
  todos: TodosState;
  handleSave: (id: number, editedTodo: string) => void;
  handleDelete: (id: number) => void;
}

function TaskList({ todos, handleSave, handleDelete }: TaskListProps) {
  return (
    <ul>
      {todos.entities.map((item) => (
        <TaskItem
          key={item.id}
          item={item}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default TaskList;