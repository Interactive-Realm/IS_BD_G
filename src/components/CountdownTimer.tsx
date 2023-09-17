import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [count, setCount] = useState(2);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      if (count > -1) {
        setCount(count - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [count]);

  useEffect(() => {
    if (count === 2) {
      setMessage('KLAR');
    } else if (count === 1) {
      setMessage('PARAT');
    }
    else if (count === 0) {
      setMessage('SPIL');
    }
    else if (count === -1) {
      setMessage("");
    }
  }, [count]);

  return (
    <div className="countdown-container">
      {message && <p>{message}</p>}
    </div>
  );
};

export default CountdownTimer;
