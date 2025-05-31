import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ msg: 'User exists' });

    const hash = await bcrypt.hash(password, 12);
    await User.create({ username, password: hash });

    res.status(201).json({ msg: 'Registered' });
  } catch (err) {
    res.status(500).json({ msg: 'Error registering', err });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { username: user.username, stats: user.stats } });
  } catch (err) {
    res.status(500).json({ msg: 'Login error', err });
  }
};

export const saveStats = async (req, res) => {
  try {
    const { wpm, accuracy, mode, testType, duration, wordCount } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.stats.push({ wpm, accuracy, mode, testType, duration, wordCount });
    await user.save();

    res.status(200).json({ message: 'Stats saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getStats = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('stats');
    res.json(user.stats);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
