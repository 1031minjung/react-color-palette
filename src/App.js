import React, { useState } from 'react';
import './App.css'; // You can keep or modify this

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function App() {
  const [colors, setColors] = useState([
    getRandomColor(),
    getRandomColor(),
    getRandomColor(),
    getRandomColor(),
  ]);

  const generateNewColors = () => {
    const newColors = Array.from({ length: colors.length }, () => getRandomColor());
    setColors(newColors);
  };

  return (
    <div className="App">
      <h1>Color Palette Generator</h1>
      <div className="palette">
        {colors.map((color, index) => (
          <div
            key={index}
            className="color-box"
            style={{ backgroundColor: color }}
          >
            {index} - {color}
          </div>
        ))}
      </div>
      <button onClick={generateNewColors}>Generate New Colors</button>
    </div>
  );
}

export default App;