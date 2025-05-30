// src/App.jsx
import { useEffect, useState } from "react";
import Header from "./components/Header";
import TypingArea from "./components/TypingArea";
import Stats from "./components/Stats";
import RestartButton from "./components/RestartButton";
import NavBar from "./components/NavBar";

function App() {
  const [userInput, setUserInput] = useState("");
  const [text, setText] = useState("");
  const [testType, setTestType] = useState("time");
  const [duration, setDuration] = useState(30);
  const [remainingTime, setRemainingTime] = useState(duration);
  const [wordCount, setWordCount] = useState(50);
  const [mode, setMode] = useState("default");

  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const fetchNewText = async () => {
    try {
      const response = await fetch(
        `https://baconipsum.com/api/?type=all-meat&sentences=10`
      );
      const data = await response.json();
      let rawText = data[0];

      if (mode === "noPunctuation") {
        rawText = rawText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
      }

      if (mode === "textOnly") {
        rawText = rawText.replace(/[^A-Za-z\s]/g, "");
      }

      const words = rawText.split(" ").filter(Boolean);

      if (testType === "words") {
        setText(words.slice(0, wordCount).join(" "));
      } else {
        setText(words.join(" "));
      }
    } catch (err) {
      console.error("Error fetching text:", err);
      setText("The quick brown fox jumps over the lazy dog.");
    }
  };

  useEffect(() => {
    fetchNewText();
  }, [mode, wordCount, testType]);

  useEffect(() => {
    let interval;
    if (testType === "time" && isRunning && !isCompleted) {
      interval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            setIsCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isCompleted, testType]);

  useEffect(() => {
    if (testType === "words") {
      const wordsTyped = userInput.trim().split(/\s+/).length;
      if (wordsTyped >= wordCount) {
        setIsRunning(false);
        setIsCompleted(true);
      }
    }
  }, [userInput, wordCount, testType]);

  const handleChange = (event) => {
    const value = event.target.value;
    if (!isRunning && value.length === 1) {
      setIsRunning(true);
      setStartTime(Date.now());
      if (testType === "time") {
        setRemainingTime(duration); // reset timer on restart
      }
    }
    setUserInput(value);
  };

  const calculateWPM = () => {
    const words = userInput.trim().split(/\s+/).length;
    const timeSpent = (Date.now() - startTime) / 1000 / 60;
    return timeSpent > 0 ? Math.round(words / timeSpent) : 0;
  };

  const calculateAccuracy = () => {
    let correct = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === text[i]) correct++;
    }
    return userInput.length === 0
      ? 0
      : Math.round((correct / userInput.length) * 100);
  };

  const restartRace = () => {
    setUserInput("");
    fetchNewText();
    setIsRunning(false);
    setIsCompleted(false);
    setStartTime(null);
    if (testType === "time") {
      setRemainingTime(duration);
    }
  };

  return (
    <div
      className="app"
      onClick={() => {
        if (document.activeElement === document.getElementById("hiddenInput")) return;
        document.getElementById("hiddenInput")?.blur();
      }}
    >
      <Header />
      <NavBar
        mode={mode}
        setMode={setMode}
        wordCount={wordCount}
        setWordCount={setWordCount}
        testType={testType}
        setTestType={setTestType}
        duration={duration}
        setDuration={setDuration}
      />
      <main className="flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-[1300px]">
          {testType === "time" && <p className="timer">{remainingTime}s</p>}
          {testType === "words" && (
            <p className="word-count-label">{wordCount} words</p>
          )}
          <TypingArea
            text={text}
            userInput={userInput}
            handleChange={handleChange}
            isCompleted={isCompleted}
          />
        </div>
        {isCompleted && (
          <Stats
            time={(Date.now() - startTime) / 1000}
            wpm={calculateWPM()}
            accuracy={calculateAccuracy()}
          />
        )}
        <RestartButton onRestart={restartRace} />
      </main>
    </div>
  );
}

export default App;
