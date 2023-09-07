import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatScore } from '../../utils';
import BalloonGenerator from '../BalloonGenerator';

const Ram = () => {
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
      <span className="ram__hud ram__time no-select">00:{time}</span>
      <span className="ram__hud ram__score no-select">
        {formatScore(score)}
      </span>
      <div className="background">
        <img src="/sky.jpg" alt="himmel" />
      </div>
      <div>
        <BalloonGenerator setScore={setScore} />
      </div>
    </div>
  );
};

export default Ram;
