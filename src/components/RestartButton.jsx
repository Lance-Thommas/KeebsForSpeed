const Restartbutton = ({ onRestart }) => {
    return (
        <button
            onClick={onRestart}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
        >
            Restart
        </button>
    );
};

export default Restartbutton;