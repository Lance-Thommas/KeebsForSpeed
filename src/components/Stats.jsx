const Stats = ({ time, wpm, accuracy }) => {
    return (
        <div className="mt-6 text-lg">
            <p>⏱️Time: {time}</p>
            <p>💨WPM: {wpm}</p>
            <p>🎯Accuracy: {accuracy}</p>
        </div>
    );
};

export default Stats;