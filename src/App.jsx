import { useState } from 'react';
import headerImage from './assets/header.png';


export default function App() {
  const [strength, setStrength] = useState(4);
  const [toughness, setToughness] = useState(4);

  const calculateWoundRoll = (s, t) => {
    if (s >= t * 2) return '2+';
    if (s > t) return '3+';
    if (s === t) return '4+';
    if (s * 2 <= t) return '6+';
    return '5+';
  };

  const adjustValue = (value, delta) => Math.max(1, value + delta);

  const woundRoll = calculateWoundRoll(strength, toughness);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '400px', margin: '40px auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
  <img 
    src={headerImage} 
    alt="Warhammer 40K Companion" 
    style={{ width: '100%', maxWidth: '400px' }} 
  />
</div>


      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginBottom: '5px', display: 'block', textAlign: 'center' }}>Strength:</label>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button 
            onClick={() => setStrength(adjustValue(strength, -1))}
            style={{ padding: '10px', fontSize: '18px' }}>-</button>
          <input
  type="number"
  value={strength}
  onChange={(e) => setStrength(Number(e.target.value) || 1)}
  style={{ 
    padding: '10px', 
    width: '60px', 
    textAlign: 'center',  // Centers numbers
    margin: '0 5px', 
    fontSize: '16px',
  }}
/>

          <button 
            onClick={() => setStrength(adjustValue(strength, 1))}
            style={{ padding: '10px', fontSize: '18px' }}>+</button>
        </div>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginBottom: '5px', display: 'block', textAlign: 'center' }}>Toughness:</label>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button 
            onClick={() => setToughness(adjustValue(toughness, -1))}
            style={{ padding: '10px', fontSize: '18px' }}>-</button>
          <input
  type="number"
  value={toughness}
  onChange={(e) => setToughness(Number(e.target.value) || 1)}
  style={{ 
    padding: '10px', 
    width: '60px', 
    textAlign: 'center',  // Centers numbers
    margin: '0 5px', 
    fontSize: '16px',
  }}
/>

          <button 
            onClick={() => setToughness(adjustValue(toughness, 1))}
            style={{ padding: '10px', fontSize: '18px' }}>+</button>
        </div>
      </div>

      <div style={{ marginTop: '20px', fontSize: '18px', textAlign: 'center' }}>
        🎯 <strong>You need to roll: {woundRoll}</strong>
      </div>
    </div>
  );
}
