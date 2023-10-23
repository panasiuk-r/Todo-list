import express from "express";

import {getTodos, postTodo, deleteTodo, patchTodo} from '../controllers/todoController';

const router = express.Router();

router.get('/todo', getTodos);
router.delete('/todo/:id', deleteTodo);
router.post('/todo', postTodo);
router.patch('/todo/:id', patchTodo);

export default router;