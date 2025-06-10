import { useState, useEffect } from "react";
import { getDesignBackgrounds } from "./services/openai";

function App() {
  const [prompt, setPrompt] = useState("");

  const applyLocalStorageStyles = () => {
    ["designA", "designB", "designC"].forEach((key) => {
      const el = document.getElementById(key);
      const bg = localStorage.getItem(key);
      if (el && bg) {
        el.style.background = bg;
      }
    });
  };

  useEffect(() => {
    applyLocalStorageStyles();
  }, []);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    const results = await getDesignBackgrounds(prompt);
    if (!results) return;

    results.forEach((style, idx) => {
      const key = `design${String.fromCharCode(65 + idx)}`; // designA, B, C
      localStorage.setItem(key, style.backgroundColor);
    });

    applyLocalStorageStyles();
  };

  // PC想定のスタイル
  const containerStyle = {
    padding: "24px",
    maxWidth: "1800px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    fontFamily: "Arial, sans-serif",
  };

  const titleStyle = {
    fontSize: "1.8rem",
    fontWeight: "bold",
  };

  const inputStyle = {
    width: "85%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    boxSizing: "border-box",
  };

  const buttonStyle1 = {
    width: "10%",
    backgroundColor: "#3b82f6",
    color: "white",
    padding: "10px 18px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    margin: "0 0 0 60px",
  };

  const buttonStyle2 = {
    backgroundColor: "#3b82f6",
    color: "white",
    padding: "10px 18px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    margin: "0 0 0 230px",
  };

  const buttonStyle3 = {
    backgroundColor: "#3b82f6",
    color: "white",
    padding: "10px 18px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    margin: "0 0 0 500px",
  };

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
  };

  const rowStyle2 = {
    display: "flex",
  };

  const rowStyle3 = {
    padding:"80px 0 0 0",
  };

  const pStyle1={
    margin: "0 0 0 250px",
  }

  const pStyle2={
    margin: "0 0 0 550px",
  }

  const designBoxStyle = {
    flex: 1,
    height: "300px",
    borderRadius: "12px",
    color: "white",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
    border: "1px solid #ccc",
    minWidth: "0",
  };

  return (
    <div style={containerStyle}>
      
      <h1 style={titleStyle}>デザイン背景生成AI</h1>

      <div style={rowStyle3}>
        <button id="buttonA" style={buttonStyle2}>プレビュー</button>
        <button id="buttonB" style={buttonStyle3}>プレビュー</button>
        <button id="buttonC" style={buttonStyle3}>プレビュー</button>
      </div>

      <div style={rowStyle}>
        <div id="designA" style={designBoxStyle}></div>
        <div id="designB" style={designBoxStyle}></div>
        <div id="designC" style={designBoxStyle}></div>
      </div>
      <div style={rowStyle2}>
        <p style={pStyle1}>Design A</p>
        <p style={pStyle2}>Design B</p>
        <p style={pStyle2}>Design C</p>
      </div>

      <div style={rowStyle3}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleGenerate();
            }
          }}
          placeholder="例: ハワイっぽい雰囲気、ポップな感じ"
          style={inputStyle}
        />
        <button style={buttonStyle1}>
          エクスポート
        </button>
      </div>
      
    </div>
  );
}

export default App;
