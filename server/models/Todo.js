import { model, Schema } from 'mongoose';

const Todo = new Schema({
  message: String,
  completedAt: Date,
}, {
  // this will add createdAt and updatedAt timestamp when save
  timestamps: true,
})

export default model('Todo', Todo);
