import { useEffect, useState } from 'react';
import { fetchStats } from '../services/api';

function StatsPage() {
    const [stats, setStats] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) return;
        fetchStats(token).then(res => setStats(res.data)).catch(console.error);
    }, [token]);

    if (!token) return <p style={{ color: 'white' }}>Please log in to view stats.</p>;

    if (!stats.length) return <p style={{ color: 'white' }}>No stats yet.</p>;

    const avg = arr => (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1);
    const avgWpm = avg(stats.map(s => s.wpm));
    const avgAcc = avg(stats.map(s => s.accuracy));

    return (
        <div style={{ color: 'white' }}>
            <h2>Your Stats</h2>
            <p>Average WPM: {avgWpm}</p>
            <p>Average Accuracy: {avgAcc}%</p>
            <p>Total Races: {stats.length}</p>
        </div>
    );
}
export default StatsPage;
