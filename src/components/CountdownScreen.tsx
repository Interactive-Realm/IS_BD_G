import React, { useState, useEffect } from "react";
import CountdownTimer from './CountdownTimer';

interface LoadingScreenProps {
    onComplete: () => void; // Define the type for onComplete
  }
  
  const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
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
        onComplete();
      }
    }, [countdownComplete, onComplete]);
  
    return (
      <div>
        <CountdownTimer />
      </div>
    );
  };
  
  export default LoadingScreen;