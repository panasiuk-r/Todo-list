import { Request, Response } from 'express';
import { getAllTodos, removeTodo, addTodo, editTodo } from '../services/todoService';

const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos = await getAllTodos();
    res.json(todos);
  } catch (error) {
    console.error('Error getting todos:', error);
    res.status(500).end();
  }
};

const postTodo = async (req: Request, res: Response): Promise<void> => {
  const todo: string = req.body.todo || '';
  if (todo) {
    try {
      const task = await addTodo(todo);
      res.status(201).json(task);
    } catch (error) {
      console.error('Error adding todo:', error);
      res.status(500).end();
    }
  } else {
    res.status(400).end();
  }
};

const patchTodo = async (req: Request, res: Response): Promise<void> => {
  const todo: string = req.body.todo || '';
  const id = Number(req.params.id);
  if (todo && !isNaN(id)) {
    try {
      const task = await editTodo(id, todo);
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (error) {
      console.error('Error editing todo:', error);
      res.status(500).end();
    }
  } else {
    res.status(400).end();
  }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  if (!isNaN(id)) {
    try {
      const flag = await removeTodo(id);
      if (flag) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      res.status(500).end();
    }
  } else {
    res.status(400).end();
  }
};

export { getTodos, postTodo, patchTodo, deleteTodo };
