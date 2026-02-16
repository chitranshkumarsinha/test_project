import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Please add task content'],
    trim: true,
    maxlength: [500, 'Content cannot be more than 500 characters']
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
taskSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Task', taskSchema);