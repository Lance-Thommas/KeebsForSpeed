import { useState } from "react";
import LoginPopup from "./LoginPopup"; 

function NavBar({ mode, setMode, testType, setTestType }) {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <nav className="navbar-container">
      <div className="navbar">
        <div className="nav-section">
          <button
            className={`nav-btn ${mode === "default" ? "active" : ""}`}
            onClick={() => setMode("default")}
          >
            Default
          </button>
          <button
            className={`nav-btn ${mode === "noPunctuation" ? "active" : ""}`}
            onClick={() => setMode("noPunctuation")}
          >
            No Punctuation
          </button>
          <button
            className={`nav-btn ${mode === "textOnly" ? "active" : ""}`}
            onClick={() => setMode("textOnly")}
          >
            Text Only
          </button>
        </div>

        <div className="nav-section">
          <button
            className={`nav-btn ${testType === "time" ? "active" : ""}`}
            onClick={() => setTestType("time")}
          >
            Time
          </button>
          <button
            className={`nav-btn ${testType === "words" ? "active" : ""}`}
            onClick={() => setTestType("words")}
          >
            Words
          </button>
        </div>

        <div className="nav-section nav-profile">
          <button className="nav-btn" onClick={() => setShowLogin(true)}>
            👤
          </button>
        </div>
      </div>

      {showLogin && <LoginPopup close={() => setShowLogin(false)} />}
    </nav>
  );
}

export default NavBar;
