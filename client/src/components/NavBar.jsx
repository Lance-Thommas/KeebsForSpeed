// src/components/NavBar.jsx
function NavBar({ mode, setMode, testType, setTestType }) {
  return (
    <nav className="navbar">
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
    </nav>
  );
}

export default NavBar;
