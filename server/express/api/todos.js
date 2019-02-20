import { Router } from 'express';
import Todo from '../../models/Todo';

const router = Router();

router.get('/', async (req, res) => {
  const todos = await Todo.find({});
  res.json({
    payload: todos,
  });
});

router.post('/', async (req, res) => {
  const rawTodo = new Todo(req.body);

  const todo = await rawTodo.save();

  res.json(todo);
})

router.get('/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  res.json(todo);
})

router.post('/:id', async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body);

  res.json(todo);
})

router.use((err, req, res, next) => {
  if (err) {
    res.status(400).json(err);
  }
});

export default router;
