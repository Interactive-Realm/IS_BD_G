import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatScore } from '../../utils';
import BalloonGenerator from '../BalloonGenerator';

const Game = () => {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(45);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(
      () => setTime((t) => Math.max(t - 1, 0)),
      1000
    );

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (time <= 0) {
      navigate('/');
    }
  }, [time, navigate]);

  return (
    <div>
      <span className="fixed top-5 left-5">00:{time}</span>
      <span className="fixed top-5 right-5">{formatScore(score)}</span>
      <div>
        <BalloonGenerator setScore={setScore} />
      </div>
    </div>
  );
};

export default Game;
