import { useState } from 'react';

export default function App() {
  const [strength, setStrength] = useState("4");   // Store as strings
  const [toughness, setToughness] = useState("4"); // Store as strings

  const calculateWoundRoll = (s, t) => {
    if (s >= t * 2) return '2+';
    if (s > t) return '3+';
    if (s === t) return '4+';
    if (s * 2 <= t) return '6+';
    return '5+';
  };

  const numericStrength = parseInt(strength, 10) || 0;
  const numericToughness = parseInt(toughness, 10) || 0;

  const woundRoll =
    numericStrength > 0 && numericToughness > 0
      ? calculateWoundRoll(numericStrength, numericToughness)
      : '–';

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'sans-serif',
      maxWidth: '400px',
      margin: '40px auto 20px' // top margin, auto sides, bottom margin
    }}>
      <h2>🎲 Strength vs Toughness 🎲</h2>

      <div>
        <label>Strength:</label><br />
        <input
          type="number"
          value={strength}
          onChange={(e) => setStrength(e.target.value)}
          style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
        />
      </div>

      <div>
        <label>Toughness:</label><br />
        <input
          type="number"
          value={toughness}
          onChange={(e) => setToughness(e.target.value)}
          style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
        />
      </div>

      <div style={{ marginTop: '20px', fontSize: '18px' }}>
        🎯 <strong>You need to roll: {woundRoll}</strong>
      </div>
    </div>
  );
}
