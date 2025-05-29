import { RotateCcw } from 'lucide-react';

const RestartButton = ({ onRestart }) => {
    return (
        <button
            onClick={onRestart}
            className="restart"
        >
            <RotateCcw size={24} className="restart-icon" />
        </button>
    );
};

export default RestartButton;