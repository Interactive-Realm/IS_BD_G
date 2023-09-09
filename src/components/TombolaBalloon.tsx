import React, { useEffect, useState } from 'react';

type Props = {
  setHasPrize: React.Dispatch<React.SetStateAction<boolean>>;
  color: 'red' | 'blue';
  children: React.ReactNode;
};

let timeout: NodeJS.Timeout;

const TombolaBalloon = ({ setHasPrize, color, children }: Props) => {
  const animationDuration = Math.max(Math.random() * 8, 6);
  const swayAnimationDuration = Math.max(Math.random() * 15, 10);
  const expandTime = 2500;
  const [scale, setScale] = useState(1);
  const [shake, setShake] = useState(0);
  const [zIndex, setZIndex] = useState(0);
  const [isPressing, setIsPressing] = useState(false);
  const [style, setStyle] = useState({
    '--animation-duration': `${animationDuration}s`,
    '--sway-animation-duration': `${swayAnimationDuration}s`,
    '--scale': scale,
    '--z-index': zIndex,
    '--expand-time': `${expandTime}ms`,
    '--shake': `${shake}deg`,
  });

  useEffect(() => {
    if (isPressing) {
      timeout = setTimeout(() => {
        setHasPrize(true);
      }, expandTime - 200);
    } else {
      handleStop();
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isPressing, setHasPrize]);

  useEffect(() => {
    console.log(animationDuration);
    setStyle({
      '--animation-duration': `${animationDuration}s`,
      '--sway-animation-duration': `${swayAnimationDuration}s`,
      '--scale': scale,
      '--z-index': zIndex,
      '--expand-time': `${expandTime}ms`,
      '--shake': `${shake}deg`,
    });
  }, [
    scale,
    animationDuration,
    swayAnimationDuration,
    zIndex,
    expandTime,
    isPressing,
    shake,
  ]);

  const handleStart = async () => {
    setIsPressing(true);
    setScale(2);
    setZIndex(200);
    setShake(1);
  };

  const handleStop = () => {
    clearTimeout(timeout);
    setIsPressing(false);
    setScale(1);
    setZIndex(0);
    setShake(0);
  };

  return (
    <span
      onMouseDown={handleStart}
      onTouchStart={handleStart}
      onTouchEnd={handleStop}
      onMouseUp={handleStop}
      className={`tombola__balloon ${color}`}
      style={style}>
      <div className={isPressing ? 'shake' : ''}>{children}</div>
    </span>
  );
};

export default TombolaBalloon;
