import React, { useState } from 'react';
import './App.css';



function copyToClipboard(colorCode) {
  navigator.clipboard.writeText(colorCode)
    .then(() => {
      alert(`Copied into your clipboard:  ${colorCode}`);
    })
    .catch(error => {
      console.error('Failed to copy text: ', error);
      alert('Failed to copy the color code.');
    });
}

// Helper function to generate a random hex color
const getRandomHex = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};

// Helper function to lighten a hex color (basic implementation)
const lightenColor = (hex, percent) => {
  const f = parseInt(hex.slice(1), 16);
  const t = percent < 0 ? 0 : 255;
  const p = percent < 0 ? percent * -1 : percent;
  const R = f >> 16;
  const G = (f >> 8) & 0x00FF;
  const B = f & 0x0000FF;
  return '#' + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
};

// Helper function to darken a hex color (basic implementation)
const darkenColor = (hex, percent) => lightenColor(hex, -percent);

// Helper function to get the complementary color (very basic)
const complementColor = (hex) => {
  const f = parseInt(hex.slice(1), 16);
  const R = 255 - (f >> 16);
  const G = 255 - ((f >> 8) & 0x00FF);
  const B = 255 - (f & 0x0000FF);
  return '#' + ((B | (G << 8) | (R << 16)) + 0x1000000).toString(16).slice(1);
};

// Helper function to determine readable text color (simplified)
const getReadableTextColor = (hex) => {
  let rHex = '';
  let gHex = '';
  let bHex = '';

  // Handle both 3-character and 6-character hex codes
  if (hex.length === 4) { // e.g., #fff
    rHex = hex[1] + hex[1];
    gHex = hex[2] + hex[2];
    bHex = hex[3] + hex[3];
  } else if (hex.length === 7) { // e.g., #ffffff
    rHex = hex.slice(1, 3);
    gHex = hex.slice(3, 5);
    bHex = hex.slice(5, 7);
  }

  const r = parseInt(rHex, 16) / 255;
  const g = parseInt(gHex, 16) / 255;
  const b = parseInt(bHex, 16) / 255;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const textColor = luminance > 0.5 ? '#000' : '#fff';
  return textColor;
};

const navigatioins = ['Home', 'About', 'Services', 'Contact'];

function App() {

  const [displayExample, setDisplayExample] = useState(false);

  const [palette, setPalette] = useState({
    mainColor: '#bb684a',
    subMainColor: '#ddb4a5',
    accentColor: '#4497b5',
    textColor: '#fff',
    linkColor: '#5e3425',
  });

  const toggleExample = () => {
    setDisplayExample(!displayExample);
  };

  const generateConsistentPalette = () => {
    let baseColor = getRandomHex();
    let accentColor = complementColor(baseColor);
    let textColor = getReadableTextColor(baseColor);
    let linkColor = darkenColor(baseColor, 0.5);

    // Ensure accentColor and textColor are not the same
    while (accentColor === textColor) {
      baseColor = getRandomHex();
      accentColor = complementColor(baseColor);
      textColor = getReadableTextColor(baseColor);
    }

    setPalette({
      mainColor: baseColor,
      subMainColor: lightenColor(baseColor, 0.5),
      accentColor: accentColor,
      textColor: textColor,
      linkColor: linkColor,
    });

  };

  const paletteArray = Object.values(palette).filter(value => typeof value === 'string' && value.startsWith('#'));

  return (
    <div className="body">
      <div className="App">
        <h1>Consistent Color Palette Generator</h1>
        <div className="palette">
          {paletteArray.map((color, index) => (
            <div
              key={index}
              className="color-box"
              style={{ backgroundColor: color, color: getReadableTextColor(color) }}
              onClick={() => copyToClipboard(color)}
            >
              {index} - {color}
            </div>
          ))}
        </div>
          
        <button className='example-button' onClick={toggleExample}>
          {displayExample ? 'Hide Example' : 'Show Example'}
        </button>
        <button className='generate-new-color-button' onClick={generateConsistentPalette}>Generate New Colors</button>
      </div>
      {displayExample && 
        <div className='example'>
          <header style={{ backgroundColor: palette.mainColor, color: palette.textColor }}>
            <div className='header'>
              <span style={{ color: palette.accentColor }} className='logo'>MyBrand</span>
              <nav>
                <ul>
                  {navigatioins.map((navigation) => (
                    <li key={navigation}>
                      <a href="#" style={{ color: palette.textColor }}>{navigation}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div>
              <button style={{ backgroundColor: palette.accentColor, color: palette.textColor, padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Sign Up</button>
            </div>
          </header>

          <section style={{ backgroundColor: palette.subMainColor, color: palette.textColor, padding: '40px 20px', textAlign: 'center' }}>
            <h2>Welcome to Our Amazing Website!</h2>
            <p>
            <a href="#" style={{ cursor: 'pointer', color: palette.linkColor }}>Click here</a> and Discover incredible things and join our community.
            </p>
            <button style={{ backgroundColor: palette.accentColor, color: palette.textColor}}>
              Explore Now
            </button>
          </section>
        </div>
      }
    </div>
  );
}

export default App;