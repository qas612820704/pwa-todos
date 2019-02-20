import { model, Schema } from 'mongoose';

const Todo = new Schema({
  message: String,
}, {
  // this will add createdAt and updatedAt timestamp when save
  timestamps: true,
})

export default model('Todo', Todo);
