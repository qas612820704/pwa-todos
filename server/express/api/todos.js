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

  res.json({
    payload: todo
  });
})

router.get('/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  res.json({
    payload: todo
  });
})

router.post('/:id', async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json({
    payload: todo
  });
})

router.delete('/:id', async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);

  res.json({
    payload: todo,
  });
})

router.put('/:id/activate', async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, {
    $unset: { completedAt: true },
  }, {
    new: true,
  });

  res.json({
    payload: todo
  });
})

router.delete('/:id/activate', async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, {
    $set: {
      completedAt: Date.now()
    },
  }, {
    new: true,
  });

  res.json({
    payload: todo
  });
})


router.use((err, req, res, next) => {
  if (err) {
    res.status(400).json(err);
  }
});

export default router;
