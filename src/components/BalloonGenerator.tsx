import { useEffect, useState } from 'react';
import { Balloon as BalloonType } from '../types';
import Balloon from './Balloon';

type Props = {
  setScore: React.Dispatch<React.SetStateAction<number>>;
};

const BalloonGenerator = ({ setScore }: Props) => {
  const [balloons, setBalloons] = useState<BalloonType[]>([]);

  const createBalloon = (index: number): BalloonType => {
    return {
      id: index,
      color: 'blue',
      x: Math.random() * 100,
      y: 100 + Math.random() * 20,
      speed: Math.max(0.15, Math.random() * 0.3),
    };
  };

  useEffect(() => {
    const arr: BalloonType[] = Array(25)
      .fill(undefined)
      .map((_, i) => createBalloon(i));
    setBalloons(arr);

    const interval = setInterval(() => {
      setBalloons((balloons) => {
        let b = [...balloons];
        b = b.map((balloon) => {
          balloon.y -= balloon.speed;
          if (balloon.y < -10) {
            balloon = createBalloon(balloon.id);
          }
          return balloon;
        });
        return b;
      });
    }, 1 / 60);
    return () => clearInterval(interval);
  }, []);

  const handleClick = (index: number) => {
    setScore((s) => s + 1);
    setBalloons((balloons) => {
      const b = [...balloons];
      b[index] = createBalloon(index);
      return b;
    });
    console.log('CLICK');
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
