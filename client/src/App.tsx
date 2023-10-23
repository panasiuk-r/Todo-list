import React, { CSSProperties, useEffect } from 'react';

import './App.css';
import { useAppDispatch, useAppSelector } from '../src/hooks/reduxHook';
import { fetchTodos, createTodo, deleteTodo, editTodo } from '../src/reducers/todosSlice';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const mainStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    alignItems: 'center',
    paddingTop: '3em',
    paddingLeft: '2.8em',
    paddingRight: '2.8em',
    paddingBottom: '2.1em',
    border: '2px dashed #DAA06D',
    borderRadius: 15,
    backgroundColor: '#EADDCA',
    boxShadow: '0 0 0 4px #EADDCA',
    maxWidth: '40%',
    margin: 'auto',
    marginTop: 50,  
  }
  
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const createTask = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const todo: string = event.currentTarget.task.value;
    dispatch(createTodo(todo));
    event.currentTarget.reset();
  };


  return (
    <div style={mainStyle}>
      <TaskForm createTask={createTask} />
      <TaskList
        todos={todos}
        handleSave={(id: number, editedTodo: string) => dispatch(editTodo({ id, todo: editedTodo }))}
        handleDelete={(id: number) => dispatch(deleteTodo(id))}
      />
    </div>
  );
}

export default App;
