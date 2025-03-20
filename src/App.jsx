import { useState } from 'react';

// Import all your graphic assets
import headerImage from './assets/header.png';
import plusImage from './assets/plus.png';
import minusImage from './assets/minus.png';
import turnTitleImage from './assets/current-turn.png';
import cpTitleImage from './assets/cp.png';
import yourScoreImage from './assets/your-score.png';
import opponentScoreImage from './assets/opponent-score.png';
import resetImage from './assets/reset.png';
import strengthToughnessImage from './assets/strength-toughness.png';

// Reusable component for graphic tracker inputs
const GraphicTrackerInput = ({ labelImage, value, setValue, min = 0, max = 100, step = 1 }) => (
  <div style={{ marginBottom: '15px', textAlign: 'center' }}>
    {labelImage && <img src={labelImage} style={{ maxWidth: '150px', marginBottom: '5px' }} />}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <button onClick={() => setValue(Math.max(min, value - step))}
        style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}>
        <img src={minusImage} style={{ width: '30px' }} />
      </button>
      <input type="number" value={value}
        onChange={(e) => setValue(Number(e.target.value) || min)}
        style={{
          width: '50px', textAlign: 'center', margin: '0 5px',
          padding: '8px', fontSize: '16px'
        }} />
      <button onClick={() => setValue(Math.min(max, value + step))}
        style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}>
        <img src={plusImage} style={{ width: '30px' }} />
      </button>
    </div>
  </div>
);

export default function App() {
  // Game Tracker states
  const [turn, setTurn] = useState(1);
  const [cp, setCp] = useState(0);
  const [yourScore, setYourScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);

  // Strength vs Toughness states
  const [strength, setStrength] = useState(4);
  const [toughness, setToughness] = useState(4);

  // Wound roll calculation logic
  const calculateWoundRoll = (s, t) => {
    if (s >= t * 2) return '2+';
    if (s > t) return '3+';
    if (s === t) return '4+';
    if (s * 2 <= t) return '6+';
    return '5+';
  };

  const woundRoll = calculateWoundRoll(strength, toughness);

  // Reset all values to defaults
  const resetAllValues = () => {
    setTurn(1);
    setCp(0);
    setYourScore(0);
    setOpponentScore(0);
    setStrength(4);
    setToughness(4);
  };

  return (
    <div style={{
      padding: '20px', fontFamily: 'sans-serif',
      maxWidth: '400px', margin: '20px auto', color: '#ffffff'
    }}>

      {/* Header Graphic */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <img src={headerImage} alt="Warhammer 40K Companion" style={{ width: '100%', maxWidth: '350px' }} />
      </div>

      {/* Game Tracker Inputs */}
      <GraphicTrackerInput labelImage={turnTitleImage} value={turn} setValue={setTurn} min={1} max={5} />
      <GraphicTrackerInput labelImage={cpTitleImage} value={cp} setValue={setCp} min={0} max={20} />

      {/* Side-by-side scores */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
      <GraphicTrackerInput labelImage={yourScoreImage} value={yourScore} setValue={setYourScore} min={0} max={100} step={5} />
      <GraphicTrackerInput labelImage={opponentScoreImage} value={opponentScore} setValue={setOpponentScore} min={0} max={100} step={5} />
      </div>


      {/* Divider line */}
      <hr style={{ margin: '30px 0', borderColor: '#555' }} />

      {/* Strength vs Toughness Section with Graphic */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src={strengthToughnessImage} alt="Strength vs Toughness" style={{ width: '100%', maxWidth: '300px' }} />
      </div>

      <GraphicTrackerInput labelImage={null} value={strength} setValue={setStrength} min={1} max={20} />
      <GraphicTrackerInput labelImage={null} value={toughness} setValue={setToughness} min={1} max={20} />

      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '18px' }}>
        You need to roll:
        <div style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '5px' }}>
          {woundRoll}
        </div>
      </div>

      {/* Reset Button */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button onClick={resetAllValues} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
          <img src={resetImage} style={{ width: '150px' }} />
        </button>
      </div>

    </div>
  );
}
