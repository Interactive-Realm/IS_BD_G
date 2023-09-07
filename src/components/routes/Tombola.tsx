import { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';
import useWindowSize from '../../hooks/useWindowSize';
import { Prize } from '../../types';
import TombolaBalloon from '../TombolaBalloon';

const Tombola = () => {
  const [prize, setPrize] = useState<Prize | null>(null);
  const [showLoading, setShowLoading] = useState(true);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoading(false);
    }, 1500);

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  let component;

  if (showLoading) {
    component = (
      <div className="tombola__loading">
        <h1>INTERSPORT</h1>
      </div>
    );
  } else if (prize) {
    component = (
      <div className="tombola__result">
        <h1>{prize.name}</h1>
        <p>{prize.message}</p>
        {prize.name !== 'Nitte' && (
          <ReactConfetti
            width={width}
            height={height}
            colors={['blue', 'red']}
            gravity={0.05}
          />
        )}
      </div>
    );
  } else {
    component = (
      <div className="tombola__game">
        <h1 className="tombola__game__title">VÆLG EN BALLON</h1>
        <div className="tombola__balloons">
          <TombolaBalloon setPrize={setPrize} color="blue" />
          <TombolaBalloon setPrize={setPrize} color="red" />
          <TombolaBalloon setPrize={setPrize} color="blue" />
          <TombolaBalloon setPrize={setPrize} color="red" />
          <TombolaBalloon setPrize={setPrize} color="blue" />
          <TombolaBalloon setPrize={setPrize} color="red" />
        </div>
      </div>
    );
  }

  return <div className="tombola">{component}</div>;
};

export default Tombola;
