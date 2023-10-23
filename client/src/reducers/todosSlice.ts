import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import TodosState from '../types/TodosState';

const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await axios.get('http://localhost:3001/api/todo');
    return response.data;
  }
)

const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (todo: string) => {
    const response =  await axios.post('http://localhost:3001/api/todo', {todo});
    return response.data;
  }
)

const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id: number) => {
    await axios.delete(`http://localhost:3001/api/todo/${id}`);
    return id;  
  }
)

const editTodo = createAsyncThunk(
  'todos/editTodo',
  async ({ id, todo }: { id: number, todo: string }) => {
    const response = await axios.patch(`http://localhost:3001/api/todo/${id}`, {todo})
    return response.data
  }
)
const initialState = {
  entities: [],
  status: 'idle',
} as TodosState

const todosSlice = createSlice ({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchTodos.fulfilled, (state, action) => {
      if (action.payload.length === 0) {
        state.entities = [];
      } else {
        state.entities = action.payload;
        state.status = 'succeeded';
      }
    })
    .addCase(createTodo.fulfilled, (state, action) => {
      state.entities.push(action.payload);
      state.status = 'succeeded';
    })
    .addCase(deleteTodo.fulfilled, (state, action) => {
      state.entities = state.entities.filter(todo => todo.id !== action.payload);
      state.status = 'succeeded';
    })
    .addCase(editTodo.fulfilled, (state, action) => {
      state.entities = state.entities.map(todo => todo.id !== action.payload.id ? todo : action.payload);
      state.status = 'succeeded';
    })
  },
});

export const todosReducer = todosSlice.reducer;

export {fetchTodos, createTodo, deleteTodo, editTodo};