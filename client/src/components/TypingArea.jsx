// src/components/TypingArea.jsx
import { useEffect, useRef } from "react";
import "../index.css";

const TypingArea = ({ text, userInput, handleChange, isCompleted }) => {
    const inputRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const currentChar = textRef.current?.querySelector(".current-char");
        if (currentChar) {
            currentChar.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
        }
    }, [userInput]);

    const getCharClass = (char, index) => {
        if (!userInput[index]) return "pending-char";
        if (userInput[index] === char) return "correct-char";
        return "incorrect-char";
    };

    return (
        <div className="typing-area-container" onClick={() => inputRef.current?.focus()}>
            {/* Hidden input */}
            <input
                id="hiddenInput"
                ref={inputRef}
                value={userInput}
                onChange={handleChange}
                disabled={isCompleted}
                className="hidden-input"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
            />

            {/* Text display */}
            <div className="typing-area-text" ref={textRef}>
                {text.split("").map((char, idx) => {
                    const isCurrent = idx === userInput.length;
                    return (
                        <span
                            key={idx}
                            className={`${getCharClass(char, idx)} ${isCurrent ? "current-char" : ""}`}
                        >
                            {char}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default TypingArea;
