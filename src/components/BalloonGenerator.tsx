import { useCallback, useEffect, /*useMemo*/ useState } from 'react';
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
  const [balloonId, setBalloonId] = useState(0);

  const createBalloon = useCallback(() => {
    if (balloons.length > 50) return;

    const newBalloon = {
      id: balloonId,
      x: clamp(Math.random() * 100, 5, 95),
      y: 100 + Math.random() * 20,
      speed: Math.max(
        wave.minBalloonSpeed,
        Math.random() * wave.maxBalloonSpeed
        ),
      };
      console.log(balloons, balloonId)
    setBalloons((balloons) => [...balloons, newBalloon]);
    setBalloonId((prevId) => prevId + 1);
  }, [balloonId]);

  const spawner = () => {
    createBalloon();
    waveTimeout = setTimeout(spawner, wave.spawnInterval);
  };

  useEffect(() => {
    waveTimeout = setTimeout(spawner, wave.spawnInterval);

    return () => {
      clearInterval(updateInterval);
      clearInterval(waveTimeout);
    };
  }, []);

  const handleClick = (balloon: BalloonType) => {
    setPoppedBalloons([...poppedBalloons, balloon])
    setBalloons(balloons.filter((b) => b.id !== balloon.id));
    setScore((s) => s + 1);
  };

  const handleDestroy = (balloon: BalloonType) => {
    setPoppedBalloons(poppedBalloons.filter((b) => b.id !== balloon.id));
  };

  return (
    <div className="balloon-container">
      {balloons.map((balloon) => (
        <Balloon key={balloon.id} balloon={balloon} handleClick={() => handleClick(balloon)} />
      ))}
      {poppedBalloons.map((balloon) => (
        <PoppedBalloon key={balloon.id} balloon={balloon}  handleDestroy={() => handleDestroy(balloon)} />
      ))}
    </div>
  );
};

export default BalloonGenerator;
