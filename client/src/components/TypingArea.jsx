import { useEffect, useMemo, useRef } from 'react';

const TypingArea = ({ text, userInput, handleChange, isCompleted }) => {
    const inputRef = useRef(null);
    const LINES_TO_DISPLAY = 3;
    const MAX_CHARS_PER_LINE = 67;

    useEffect(() => {
        inputRef.current.focus();
        const handleDocumentClick = () => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        };
        document.addEventListener("click", handleDocumentClick);
        return () => document.removeEventListener("click", handleDocumentClick);
    }, []);

    // Split text into logical lines
    const lines = useMemo(() => {
        const words = text.split(" ");
        const result = [];
        let line = "";

        for (const word of words) {
            if ((line + word).length > MAX_CHARS_PER_LINE) {
                result.push(line.trim());
                line = "";
            }
            line += word + " ";
        }
        if (line) result.push(line.trim());
        return result;
    }, [text]);

    // Determine the user's current line
    const currentLineIndex = useMemo(() => {
        let totalChars = 0;
        for (let i = 0; i < lines.length; i++) {
            totalChars += lines[i].length + 1; // +1 for space/newline
            if (userInput.length < totalChars) return i;
        }
        return lines.length - 1;
    }, [userInput, lines]);

    const visibleLines = lines.slice(currentLineIndex, currentLineIndex + LINES_TO_DISPLAY);

    // Calculate global character offset
    const charOffset = lines
        .slice(0, currentLineIndex)
        .reduce((acc, line) => acc + line.length + 1, 0);

    return (
        <div className="mt-8" style={{ cursor: "text" }}>
            <div className="typing-area-text">
                {visibleLines.map((line, lineIdx) => (
                    <div key={lineIdx}>
                        {line.split("").map((char, i) => {
                            const globalIndex = charOffset + i + lineIdx * (MAX_CHARS_PER_LINE + 1);
                            const inputChar = userInput[globalIndex];
                            let style = { color: "#646669" };

                            if (inputChar !== undefined) {
                                style.color = inputChar === char ? "#d1d0c5" : "#ca4754";
                            }

                            return (
                                <span key={i} style={style}>
                                    {char}
                                </span>
                            );
                        })}
                    </div>
                ))}
            </div>
            <input
                type="text"
                ref={inputRef}
                value={userInput}
                onChange={handleChange}
                disabled={isCompleted}
                className="sr-only"
            />
        </div>
    );
};

export default TypingArea;
