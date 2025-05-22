import { useEffect, useRef } from 'react';

const TypingArea = ({ text, userInput, handleChange, isCompleted }) => {
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
        // Handles clicks anywhere on the page to always refocus to the textArea
        const handleDocumentClick = () => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        };

        document.addEventListener("click", handleDocumentClick);

        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };

    }, []);



    return (
        <div className="mt-8" style={{ cursor: "text" }}>
            <p className="typing-area-text">
                {text.split("").map((char, index) => {
                    let style = { color: "white" };
                    if (index < userInput.length) {
                        style.color = char === userInput[index] ? "lightgreen" : "red";
                    }
                    return (
                        <span key={index} style={style}>
                            {char}
                        </span>
                    );
                })}
            </p>

            <input
                type="text"
                ref={inputRef}
                value={userInput}
                onChange={(e) => handleChange(e)}
                disabled={isCompleted}
                className="sr-only"
            />
        </div>
    );

};

export default TypingArea;

