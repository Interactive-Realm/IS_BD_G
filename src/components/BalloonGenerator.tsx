import { useCallback, useEffect, useState } from 'react';
import { Wave } from '../data/waveData';
import { Balloon as BalloonType } from '../types';
import Balloon from './Balloon';

type Props = {
  setScore: React.Dispatch<React.SetStateAction<number>>;
  wave: Wave;
};

let updateInterval: NodeJS.Timeout;
let waveTimeout: NodeJS.Timeout;

const BalloonGenerator = ({ setScore, wave }: Props) => {
  const [balloons, setBalloons] = useState<BalloonType[]>([]);

  const createBalloon = useCallback((): BalloonType => {
    return {
      color: 'blue',
      x: Math.random() * 100,
      y: 100 + Math.random() * 20,
      speed: Math.max(
        wave.minBalloonSpeed,
        Math.random() * wave.maxBalloonSpeed
      ),
    };
  }, [wave.minBalloonSpeed, wave.maxBalloonSpeed]);

  const spawner = useCallback(() => {
    setBalloons((balloons) => [...balloons, createBalloon()]);
    waveTimeout = setTimeout(spawner, wave.spawnInterval);
  }, [wave, createBalloon]);

  useEffect(() => {
    updateInterval = setInterval(() => {
      setBalloons((balloons) => {
        return balloons
          .map((balloon) => {
            balloon.y -= balloon.speed;
            return balloon;
          })
          .filter((balloon) => balloon.y >= -10);
      });
    }, 1 / 60);

    spawner();

    return () => {
      clearInterval(updateInterval);
      clearInterval(waveTimeout);
    };
  }, [spawner, wave.minBalloonSpeed, wave.maxBalloonSpeed]);

  const handleClick = (index: number) => {
    setBalloons(balloons.filter((_, i) => i !== index));
    setScore((s) => s + 1);
  };

  return (
    <div className="balloon-container">
      {balloons.map((balloon, i) => (
        <Balloon key={i} balloon={balloon} handleClick={() => handleClick(i)} />
      ))}
    </div>
  );
};

export default BalloonGenerator;
