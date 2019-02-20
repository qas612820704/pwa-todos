import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import todosRouter from './api/todos';

const app = express();

app.use(cors());
app.use(json());

app.get('/', (req, res) => {
  res.end('Hello World');
})

app.use('/api/todos', todosRouter);

export default app;
