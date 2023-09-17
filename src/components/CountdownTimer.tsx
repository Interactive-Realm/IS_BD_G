import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [count, setCount] = useState(2);
  const [message, setMessage] = useState("");

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
