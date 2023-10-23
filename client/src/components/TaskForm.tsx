/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';

interface TaskFormProps {
  createTask: (event: React.FormEvent<HTMLFormElement>) => void  
}

function TaskForm({createTask}: TaskFormProps) {
  const headingStyle = css({
    paddingLeft: '0.8em',
    color: '#DAA06D',
    letterSpacing: '.5em',
    textAlign: 'center',
    paddingTop: '1em',
    paddingBottom: '3em',
  })

  const submitStyle = css({
    width: '35%',
    padding: '1.1ex 0.7em',
    backgroundColor: '#DAA06D',
    color: '#FFF',
    border: 'none',
    borderRadius: 0,
    fontSize: 15,
    cursor: 'pointer',
    transition: 'opacity 0.15s ease',
    '&:hover': {opacity: 0.8}
  });

  const inputStyle = css({
    width: '60%',
    padding: '1ex 0.7em',
    border: '1px solid #DAA06D',
    backgroundColor: '#FFF',
    fontSize: 15,
    borderRadius: 0,
    outline: 'none',
    '&:placeholder': {color: '#DAA06D'},
  })

  return (
    <form onSubmit={createTask}>
      <p css={headingStyle} >Get Things Done!</p>
      <input 
        type="text" 
        name="task" 
        placeholder="New task" 
        css={inputStyle}
      />
      <input
        type="submit"
        css={submitStyle}
      />      
    </form>
  );
}

export default TaskForm