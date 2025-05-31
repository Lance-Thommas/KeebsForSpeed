import mongoose from 'mongoose';

const statSchema = new mongoose.Schema({
  wpm: { type: Number, default: 0 },
  accuracy: { type: Number, default: 0 },
  mode: String,
  testType: String,
  duration: Number,
  wordCount: Number,
  date: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  stats: [statSchema]
});

export default mongoose.model('User', userSchema);
