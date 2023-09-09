import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGameDuration, waves } from '../../data/waveData';
import { formatScore } from '../../utils';
import BalloonGenerator from '../BalloonGenerator';
import GameEndModal from '../GameEndModal';

let interval: NodeJS.Timeout;

const Ram = () => {
  const gameTime = getGameDuration(waves);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(gameTime);
  const [waveTime, setWaveTime] = useState(0);
  const [waveIndex, setWaveIndex] = useState(0);
  const [wave, setWave] = useState(waves[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    interval = setInterval(() => {
      setTime((t) => Math.max(t - 1, 0));
      setWaveTime((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (time <= 0) {
      setIsPlaying(false);
    }
  }, [time, navigate]);

  useEffect(() => {
    if (waveIndex >= waves.length) return;

    if (waveTime > waves[waveIndex].duration) {
      setWaveIndex((i) => i + 1);
      setWaveTime(1);
    }
  }, [waveTime, wave, waveIndex]);

  useEffect(() => {
    if (waveIndex >= waves.length) return;

    setWave(waves[waveIndex]);
  }, [waveIndex]);

  return (
    <div>
      <span className="ram__hud ram__time no-select">
        00:{formatScore(time, 2)}
      </span>
      <span className="ram__hud ram__score no-select">
        {formatScore(score)}
      </span>
      <div className="background">
        <img src="/sky.jpg" alt="himmel" />
      </div>
      <div>
        <BalloonGenerator setScore={setScore} wave={wave} />
      </div>

      {!isPlaying && <GameEndModal score={score} />}
    </div>
  );
};

export default Ram;
