import { useEffect, useState } from 'react';

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 1200,
    height: 800,
  });

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

      return () => {
        window.removeEventListener('resize', () => {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        });
      };
    });
  }, []);

  return windowSize;
}
