import React, { useEffect, useState } from 'react';

type Props = {
  setHasPrize: React.Dispatch<React.SetStateAction<boolean>>;
  color: 'red' | 'blue';
  children: React.ReactNode;
  isExpanding: boolean;
  onClick: () => void;
  isAnyBalloonClicked: boolean;
};

let timeout: NodeJS.Timeout;

const TombolaBalloon = ({ setHasPrize, color, children, isExpanding, onClick, isAnyBalloonClicked  }: Props) => {
  const animationDuration = Math.max(Math.random() * 8, 6);
  const swayAnimationDuration = Math.max(Math.random() * 15, 10);
  const expandTime = 1000;
  const [isClicked, setIsClicked] = useState(false);
  const [scale, setScale] = useState(1);
  const [shake, setShake] = useState(0);
  const [zIndex, setZIndex] = useState(0);
  const [style, setStyle] = useState<React.CSSProperties & { [key: string]: unknown }>({
    '--scale': scale,
    '--z-index': zIndex,
    '--expand-time': `${expandTime}ms`,
    '--shake': `${shake}deg`,
  });

  useEffect(() => {
    if (isExpanding) {
      timeout = setTimeout(() => {
        setHasPrize(true);
      }, expandTime - 200);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isExpanding, setHasPrize]);

  useEffect(() => {
    setStyle({
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
    shake,
  ]);

  const handleStart = () => {
    if (!isAnyBalloonClicked && !isExpanding) {
      isAnyBalloonClicked = false;
      onClick(); // Notify the parent that this balloon is clicked
      setIsClicked(true); 
      setScale(2);
      setZIndex(200);
      setShake(1);
      console.log("Expanding balloon with color: " + color);
    }
    else {
      isAnyBalloonClicked = false;
    }
  };
  

  const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    e.preventDefault();
    handleStart();
  };

    return (
      <span
        onMouseDown={isAnyBalloonClicked ? undefined : handleStart}
        onTouchStart={isAnyBalloonClicked ? undefined : handleTouchStart}
        className={`tombola__balloon ${color} ${isClicked ? "clicked" : ""}`}
        style={style}
      >
        <div className={isExpanding ? "shake" : ""}>{children}</div>
      </span>
    );
  };

export default TombolaBalloon;
