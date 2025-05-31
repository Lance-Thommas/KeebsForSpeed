import User from '../models/User.js';

const saveStats = async (req, res) => {
    try {
        const { wpm, accuracy, mode, testType, duration, wordCount } = req.body;
        const user = await User.findById(req.user.id);
        user.stats.push({ wpm, accuracy, mode, testType, duration, wordCount, date: new Date() });
        await user.save();
        res.status(200).json({ message: 'Stats saved' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to save stats' });
    }
};

export default saveStats;