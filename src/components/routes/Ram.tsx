import { useState } from 'react';
import CountdownScreen from '../CountdownScreen'; // Import the LoadingScreen component
import RamEndScreen from '../ram/RamEndScreen';
import RamGame from '../ram/RamGame';
import RamMenu from '../ram/RamMenu';

export type RamScreen = "menu" | "game" | "end-screen";

const [showRam, setShowRam] = useState(false);

// Callback function to be called when the countdown is complete
const handleCountdownComplete = () => {
    setShowRam(true);
};


const Ram = () => {
  const [screen, setScreen] = useState<RamScreen>("menu");
  const [score, setScore] = useState(0);

  switch (screen) {
    case 'menu':
      return <RamMenu setScreen={setScreen} />
      case 'game':
          return showRam ? <RamGame setScreen={setScreen} score={score} setScore={setScore} /> : <CountdownScreen onComplete={handleCountdownComplete} />
    
 
    case 'end-screen':
      return <RamEndScreen setScreen={setScreen} score={score} />
  }
};

export default Ram;
