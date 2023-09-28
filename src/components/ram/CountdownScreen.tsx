import React, { useState, useEffect } from "react";
import CountdownTimer from '../CountdownTimer';
import { RamScreen } from "../routes/Ram";

interface CountdownScreenProps {
    setScreen: React.Dispatch<React.SetStateAction<RamScreen>>;
  }
  
  const CountdownScreen: React.FC<CountdownScreenProps> = ({ setScreen}) => {
    const [countdownComplete, setCountdownComplete] = useState(false);
  
    // Use useEffect to detect when the countdown is complete
    useEffect(() => {
      // Assuming CountdownTimer takes 3 seconds (3000 milliseconds)
      const countdownDuration = 4000;
  
      // Start a timer to set countdownComplete to true after 3 seconds
      const timer = setTimeout(() => {
        setCountdownComplete(true);
      }, countdownDuration);
  
      // Cleanup the timer when the component unmounts
      return () => clearTimeout(timer);
    }, []);
  
    useEffect(() => {
      // When the countdown is complete, trigger the callback to render the Ram component
      if (countdownComplete) {
        setScreen("game");
      }
    }, [countdownComplete]);
  
    return (
      <div>
        <CountdownTimer />
      </div>
    );
  };
  
  export default CountdownScreen;