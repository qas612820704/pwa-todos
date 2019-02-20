import app from './express';
import mongoose from 'mongoose';
import { MONGODB } from '../config';
// add other dev tools here,
// like borwser-sync, hot-reload

const PORT = process.env.PORT || 5001;

mongoose.connect(MONGODB.uri, { useNewUrlParser: true })
  .then(() => console.log('db is connected'))
  .catch(() => console.log('db connection fails!'));

app.listen(PORT, () => console.log(`application start on http://0:0:0:0:${PORT}`));
