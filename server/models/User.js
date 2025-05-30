import mongoose from 'mongoose';

const statSchema = new mongoose.Schema({
  wpm: { type: Number, default: 0 },
  accuracy: { type: Number, default: 0 },
  races: { type: Number, default: 0 },
  date: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  stats: [statSchema]  // <-- Array of stat objects
});

export default mongoose.model('User', userSchema);
