// src/components/StatsPopup.jsx

function StatsPopup({ wpm, accuracy, time, onRestart, user }) {
    return (
        <div className="stats-popup-overlay">
            <div className="stats-popup">
                <h2>Test Results</h2>
                <p>WPM: {wpm}</p>
                <p>Accuracy: {accuracy}%</p>
                <p>Time: {Math.round(time)}s</p>
                {user ? (
                    <p className="save-status">Stats saved to your account ✅</p>
                ) : (
                    <p className="save-status">Log in to save stats 🔒</p>
                )}
                <button onClick={onRestart} className="restart-btn">Restart</button>
            </div>
        </div>
    );
}

export default StatsPopup;
