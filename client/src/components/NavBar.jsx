// src/components/NavBar.jsx
import { useState } from "react";
import LoginPopup from "./LoginPopup";
import StatsSection from "./StatsSection";

function NavBar({
  mode,
  setMode,
  testType,
  setTestType,
  wordCount,
  setWordCount,
  user,
  setUser,
}) {
  const [showLogin, setShowLogin] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const wordOptions = [10, 25, 50, 100, 150];

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

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

        {testType === "words" && (
          <div className="nav-section word-options">
            {wordOptions.map((count) => (
              <button
                key={count}
                className={`nav-btn ${wordCount === count ? "active" : ""}`}
                onClick={() => setWordCount(count)}
              >
                {count}
              </button>
            ))}
          </div>
        )}

        <div className="nav-section nav-profile">
          {/*This gets replaced by the users username upon login which causes errors and needs to be fixed*/}
          <button className="nav-btn" onClick={() => setShowStats(true)}>
            Stats
          </button>


          {user ? (
            <>
              <span className="nav-btn username">
                {user.username || user.email}
              </span>
              <button className="nav-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button className="nav-btn" onClick={() => setShowLogin(true)}>
              👤
            </button>
          )}
        </div>
      </div>

      {showLogin && (
        <LoginPopup close={() => setShowLogin(false)} setUser={setUser} />
      )}

      {/*This gets replaced by the users username upon login which causes errors and needs to be fixed*/}
      {user && showStats && (
        <StatsSection close={() => setShowStats(false)} />
      )}

    </nav>
  );
}

export default NavBar;
