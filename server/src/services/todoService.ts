import { InferAttributes } from 'sequelize';

import Todo from '../models/Todo';

const addTodo = async (todo: string): Promise<InferAttributes<Todo, { omit: never; }> | null> => {
  try {
    const task = await Todo.create({ todo });
    return task !== null ? task.toJSON() : null;
  } catch (error) {
    throw error;
  }
};

const editTodo = async (id: number, todo: string): Promise<InferAttributes<Todo, { omit: never; }> | null> => {
  try {
    await Todo.update({ todo }, {
      where: {
        id: id
      }
    });
    const task = await Todo.findByPk(id);
    return task !== null ? task.toJSON() : null;
  } catch (error) {
    throw error;
  }
};

const removeTodo = async (id: number): Promise<boolean> => {
  try {
    await Todo.destroy({
      where: {
        id: id
      }
    });
    return true;
  } catch (error) {
    throw error;
  }
};

const getAllTodos = async (): Promise<InferAttributes<Todo, { omit: never; }>[] | null> => {
  try {
    const todos = await Todo.findAll();
    return todos !== null ? todos.map(todo => todo.toJSON()) : null;
  } catch (error) {
    throw error;
  }
};

export { getAllTodos, removeTodo, addTodo, editTodo };