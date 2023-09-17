import React, { useState, useEffect } from "react";
import countdownSound from "/sounds/CountdownBeep.wav";
import countdownSoundHighNode from "/sounds/CountdownBeep_HighNode.wav";

const CountdownTimer: React.FC = () => {
  const [count, setCount] = useState<number>(3);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count > -1) {
        setCount(count - 1);
        // Play a sound based on the count
        if (count === 3) {
          const audioElement = new Audio(countdownSound);
          setAudio(audioElement);
        } else if (count === 2) {
          const audioElement = new Audio(countdownSound);
          setAudio(audioElement);
        } else if (count === 1) {
          const audioElement = new Audio(countdownSoundHighNode);
          setAudio(audioElement);
        }
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [count]);

  useEffect(() => {
    if (audio) {
      audio.play().then(() => {
        // Remove the audio element after playing
        setAudio(null);
      });
    }
  }, [audio]);

  let content;
  if (count === 2) {
    content = (
      <p className="blue-bold">
        <span>KLAR</span>
      </p>
    );
  } else if (count === 1) {
    content = (
      <p className="blue-bold">
        <span>PARAT</span>
      </p>
    );
  } else if (count === 0) {
    content = (
      <p className="red-bold">
        <span>SPIL!</span>
      </p>
    );
  }

  return <div className="countdown-container">{content}</div>;
};

export default CountdownTimer;
