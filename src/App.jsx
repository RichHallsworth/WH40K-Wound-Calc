import { useState } from 'react';

import { useEffect } from 'react';

// Import graphic assets (ensure paths match exactly!)
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
const GraphicTrackerInput = ({ labelImage, value, setValue, min = 0, max = 100, step = 1 }) => {
  const [animate, setAnimate] = useState(false);

  const triggerAnimation = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 200); // animation duration (match your CSS)
  };

  const updateValue = (newValue) => {
    setValue(newValue);
    triggerAnimation();
  };

  return (
    <div style={{ marginBottom: '15px', textAlign: 'center', position: 'relative' }}>
      {labelImage && <img src={labelImage} style={{ maxWidth: '150px', marginBottom: '5px' }} />}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button className="icon-button"
          onClick={() => updateValue(Math.max(min, value - step))}>
          <img src={minusImage} alt="minus" />
        </button>

        <div style={{ position: 'relative', width: '50px', height: '40px', margin: '0 5px' }}>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value) || min)}
            style={{
              height: '100%',
              width: '100%',
              textAlign: 'center',
              boxSizing: 'border-box',
              position: 'absolute',
              top: 0,
              left: 0,
              backgroundColor: '#2E2E2E',
              color: '#fff',
              border: 'none',
              fontSize: '16px',
            }}
          />
          <div className={animate ? 'number-animate' : ''}
            style={{
              pointerEvents: 'none',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 'bold',
            }}>
            {value}
          </div>
        </div>

        <button className="icon-button"
          onClick={() => updateValue(Math.min(max, value + step))}>
          <img src={plusImage} alt="plus" />
        </button>
      </div>
    </div>
  );
};


export default function App() {
  const [turn, setTurn] = useState(1);
  const [cp, setCp] = useState(0);
  const [yourScore, setYourScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [strength, setStrength] = useState(4);
  const [toughness, setToughness] = useState(4);

  const calculateWoundRoll = (s, t) => {
    if (s >= t * 2) return '2+';
    if (s > t) return '3+';
    if (s === t) return '4+';
    if (s * 2 <= t) return '6+';
    return '5+';
  };

  const woundRoll = calculateWoundRoll(strength, toughness);

  const resetAllValues = () => {
    setTurn(1);
    setCp(0);
    setYourScore(0);
    setOpponentScore(0);
    setStrength(4);
    setToughness(4);

      // Load game state from localStorage on app start
useEffect(() => {
  const savedState = localStorage.getItem('warhammerGameState');
  if (savedState) {
    const { turn, cp, yourScore, opponentScore, strength, toughness } = JSON.parse(savedState);
    setTurn(turn);
    setCp(cp);
    setYourScore(yourScore);
    setOpponentScore(opponentScore);
    setStrength(strength);
    setToughness(toughness);
  }
  }, []);

// Save game state to localStorage whenever these values change
useEffect(() => {
  const gameState = { turn, cp, yourScore, opponentScore, strength, toughness };
  localStorage.setItem('warhammerGameState', JSON.stringify(gameState));
  }, [turn, cp, yourScore, opponentScore, strength, toughness]);
  };

  return (
    <div style={{
      padding: '20px', fontFamily: 'sans-serif',
      maxWidth: '400px', margin: '20px auto', color: '#ffffff'
    }}>
      {/* Header Graphic */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src={headerImage} alt="Warhammer 40K Companion" style={{ width: '100%', maxWidth: '350px' }} />
      </div>

      {/* Game Tracker Inputs */}
      <GraphicTrackerInput labelImage={turnTitleImage} value={turn} setValue={setTurn} min={1} max={5} />
      <GraphicTrackerInput labelImage={cpTitleImage} value={cp} setValue={setCp} min={0} max={20} />

      {/* Scores Side by Side (increments of 5) */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        <GraphicTrackerInput labelImage={yourScoreImage} value={yourScore} setValue={setYourScore} step={5} min={0} max={100} />
        <GraphicTrackerInput labelImage={opponentScoreImage} value={opponentScore} setValue={setOpponentScore} step={5} min={0} max={100} />
      </div>

      <hr style={{ margin: '30px 0', borderColor: '#555' }} />

      {/* Strength vs Toughness Section */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src={strengthToughnessImage} alt="Strength vs Toughness" style={{ width: '100%', maxWidth: '300px' }} />
      </div>

      <GraphicTrackerInput value={strength} setValue={setStrength} min={1} max={20} />
      <GraphicTrackerInput value={toughness} setValue={setToughness} min={1} max={20} />

      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '18px' }}>
        You need to roll:
        <div style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '5px' }}>
          {woundRoll}
        </div>
      </div>

      {/* Reset Button */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button className="reset-button" onClick={resetAllValues}>
          <img src={resetImage} alt="reset" />
        </button>
      </div>
    </div>
  );
}
