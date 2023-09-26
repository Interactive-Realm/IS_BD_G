import { useEffect, /*useMemo*/ useState } from "react";
import { Wave } from "../data/waveData";
import { Balloon as BalloonType } from "../types";
import Balloon from "./Balloon";

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

  const createBalloon = () => {
    const newBalloon = {
      id: Date.now(),
      x: clamp(Math.random() * 100, 5, 95),
      y: 100 + Math.random() * 20,
      speed: Math.max(
        wave.minBalloonSpeed,
        Math.random() * wave.maxBalloonSpeed
      ),
      class: wave.classes[Math.floor(Math.random() * wave.classes.length)],
    };

    setBalloons((bs) => {
      if (bs.length > 40) return [...bs.slice(1), newBalloon];
      return [...bs, newBalloon];
    });
  };

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
  }, [wave]);

  const handleClick = (balloon: BalloonType) => {
    setScore((s) => s + 1);
  };

  const handleDestroy = (balloon: BalloonType) => {
    setBalloons(balloons.filter((b) => b.id !== balloon.id));
  };

  return (
    <div className="balloon-container">
      {balloons.map((balloon) => (
        <Balloon
          key={balloon.id}
          balloon={balloon}
          handleClick={() => handleClick(balloon)}
          handleDestroy={() => handleDestroy(balloon)}
        />
      ))}
    </div>
  );
};

export default BalloonGenerator;
