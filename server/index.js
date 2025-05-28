import express from 'express';
import cors from 'cors';
import connectDB from './config/connectDB.js';
import dotenv from 'dotenv';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
