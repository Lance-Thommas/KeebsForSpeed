import React from 'react';

function StatsPopup({ stats, onRestart, onClose, loggedIn }) {
    return (
        <div className="popup-overlay">
            <div className="popup">
                <h2>Race Results</h2>
                <p>⏱ Time: {stats.time}s</p>
                <p>💨 WPM: {stats.wpm}</p>
                <p>🎯 Accuracy: {stats.accuracy}%</p>

                {!loggedIn && (
                    <p style={{ color: '#E2B714', marginTop: '8px' }}>
                        Log in to save stats
                    </p>
                )}

                <button onClick={onRestart}>Restart</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
export default StatsPopup;
