// src/components/StatsSection.jsx
import { useEffect, useState } from "react";

function StatsSection({ close }) {
    const [stats, setStats] = useState([]);
    const [average, setAverage] = useState({ wpm: 0, accuracy: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;
            try {
                const res = await fetch("http://localhost:5000/api/users/stats", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                setStats(data);

                if (data.length > 0) {
                    const totalWPM = data.reduce((acc, s) => acc + s.wpm, 0);
                    const totalAcc = data.reduce((acc, s) => acc + s.accuracy, 0);
                    setAverage({
                        wpm: Math.round(totalWPM / data.length),
                        accuracy: Math.round(totalAcc / data.length),
                    });
                }
            } catch (err) {
                console.error("Failed to fetch stats", err);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="popup-overlay">
            <div className="popup-content text-white">
                <button className="close-btn" onClick={close}>✖</button>
                <h2 className="text-2xl font-bold mb-4">Your Stats</h2>
                <p>Average WPM: {average.wpm}</p>
                <p>Average Accuracy: {average.accuracy}%</p>

                <h3 className="text-xl font-semibold mt-6">All Races:</h3>
                <ul className="mt-2 max-h-40 overflow-y-auto">
                    {stats.map((s, i) => (
                        <li key={i}>
                            WPM: {s.wpm} | Accuracy: {s.accuracy}% | Time: {Math.round(s.time)}s
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default StatsSection;
