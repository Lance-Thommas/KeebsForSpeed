// src/App.jsx
import { useEffect, useState } from "react";
import { sampleTexts } from "./data/sampleTexts";
import Header from "./components/Header";
import TypingArea from "./components/TypingArea";
import Stats from "./components/Stats";
import RestartButton from "./components/RestartButton";

function App() {
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [time, setTime] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [text, setText] = useState("");

  const fetchNewText = async () => {
    try {
      const response = await fetch("https://baconipsum.com/api/?type=all-meat&sentences=3");
      const data = await response.json();
      setText(data[0]);
    }
    catch (err) {
      console.error("Error fetching text:", err);
      // Fallback to a random sample text if the fetch fails
      setText("The quick brown fox jumps over the lazy dog.");
    }
  };

  useEffect(() => {
    fetchNewText();
  }, []);



  useEffect(() => {
    let interval;
    if (startTime) {
      interval = setInterval(() => {
        setTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [startTime]);


  const handleChange = (event) => {
    const value = event.target.value;
    if (!startTime && value.length === 1) {
      setStartTime(Date.now());
    }
    if (value === text) {
      setTime((Date.now() - startTime) / 1000);
      setIsCompleted(true);
    }
    setUserInput(value);
  };

  const calculateWPM = () => {
    if (time === 0) return 0;
    const words = userInput.length / 5;
    return Math.round(words / (time / 60));
  };

  const calculateAccuracy = () => {
    let correct = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === text[i]) {
        correct++;
      }
    }
    return userInput.length === 0
      ? 0
      : Math.round(((correct / userInput.length) * 100));
  }


  return (
    <div className="min-h-screen bg-gray-900 ">
      <Header />
      <main className="flex flex-col items-center justify-center p-4">

        <TypingArea
          text={text}
          userInput={userInput}
          handleChange={handleChange}
          isCompleted={isCompleted}
        />
        <Stats
          time={time}
          wpm={calculateWPM()}
          accuracy={calculateAccuracy()}
        />
        <RestartButton onRestart={() => {
          setUserInput("");
          setStartTime(null);
          setTime(0);
          fetchNewText();
          setIsCompleted(false);
        }} />
      </main>
    </div>
  );
}


export default App;
