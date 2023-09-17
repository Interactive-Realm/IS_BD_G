import { useCallback, useEffect, useMemo, useState } from 'react';
import { Wave } from '../data/waveData';
import { Balloon as BalloonType } from '../types';
import Balloon from './Balloon';
import PoppedBalloon from './PoppedBalloon';

type Props = {
  setScore: React.Dispatch<React.SetStateAction<number>>;
  wave: Wave;
};

let updateInterval: NodeJS.Timeout;
let waveTimeout: NodeJS.Timeout;

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

const BalloonGenerator = ({ setScore, wave }: Props) => {
  const [balloons, setBalloons] = useState<BalloonType[]>([]);
  const [poppedBalloons, setPoppedBalloons] = useState<BalloonType[]>([]);
  const popSound = useMemo(() => new Audio('/sounds/balloon-pop.wav'), []);

  const createBalloon = useCallback((): BalloonType => {
    return {
      color: 'blue',
      x: clamp(Math.random() * 100, 5, 95),
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
          .filter((balloon) => balloon.y >= -100);
      });
    }, 1 / 60);

    spawner();

    return () => {
      clearInterval(updateInterval);
      clearInterval(waveTimeout);
    };
  }, [spawner, wave.minBalloonSpeed, wave.maxBalloonSpeed]);

  const handleClick = (index: number) => {
    setPoppedBalloons([...poppedBalloons, balloons[index]])
    setBalloons(balloons.filter((_, i) => i !== index));
    setScore((s) => s + 1);

    if (popSound.ended) {
      popSound.play();
    } else {
      popSound.pause();
      popSound.currentTime = 0;
      popSound.play();
    }
  };

  const handleDestroy = (index: number) => {
    setPoppedBalloons(poppedBalloons.filter((_, i) => i !== index));
  };

  return (
    <div className="balloon-container">
      {balloons.map((balloon, i) => (
        <Balloon key={i} balloon={balloon} handleClick={() => handleClick(i)} />
      ))}
      {poppedBalloons.map((balloon, i) => (
        <PoppedBalloon key={i} balloon={balloon} handleDestroy={() => handleDestroy(i)} />
      ))}
    </div>
  );
};

export default BalloonGenerator;
