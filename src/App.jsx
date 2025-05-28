// src/App.jsx
import { useEffect, useState } from "react";
import { sampleTexts } from "./data/sampleTexts";
import Header from "./components/Header";
import TypingArea from "./components/TypingArea";
import Stats from "./components/Stats";
import RestartButton from "./components/RestartButton";

function App() {
  const [userInput, setUserInput] = useState("");
  const [text, setText] = useState("");
  const [duration] = useState(30); // set 30s timer
  const [remainingTime, setRemainingTime] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const fetchNewText = async () => {
    try {
      const response = await fetch("https://baconipsum.com/api/?type=all-meat&sentences=3");
      const data = await response.json();
      setText(data[0]);
    } catch (err) {
      console.error("Error fetching text:", err);
      setText("The quick brown fox jumps over the lazy dog.");
    }
  };

  useEffect(() => {
    fetchNewText();
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning && !isCompleted) {
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
  }, [isRunning, isCompleted]);

  const handleChange = (event) => {
    const value = event.target.value;
    if (!isRunning && value.length === 1) {
      setIsRunning(true);
    }
    setUserInput(value);
  };

  const calculateWPM = () => {
    const words = userInput.length / 5;
    const timeSpent = (duration - remainingTime) / 60;
    return timeSpent > 0 ? Math.round(words / timeSpent) : 0;
  };

  const calculateAccuracy = () => {
    let correct = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === text[i]) correct++;
    }
    return userInput.length === 0 ? 0 : Math.round((correct / userInput.length) * 100);
  };

  const restartRace = () => {
    setUserInput("");
    fetchNewText();
    setRemainingTime(duration);
    setIsRunning(false);
    setIsCompleted(false);
  };

  return (
    <div className="">
      <Header />
      <main className="flex flex-col items-center justify-center p-4">
        <p className="timer">
          ⏱️ Time Left: {remainingTime}s
        </p>
        <TypingArea
          text={text}
          userInput={userInput}
          handleChange={handleChange}
          isCompleted={isCompleted}
        />
        {isCompleted && (
          <Stats
            time={duration}
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
