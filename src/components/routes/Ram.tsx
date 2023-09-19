import { useState } from 'react';
import RamEndScreen from '../ram/RamEndScreen';
import RamGame from '../ram/RamGame';
import RamMenu from '../ram/RamMenu';

export type RamScreen = "menu" | "game" | "end-screen";

const Ram = () => {
  const [screen, setScreen] = useState<RamScreen>("menu");
  const [score, setScore] = useState(0);

  switch (screen) {
    case 'menu':
      return <RamMenu setScreen={setScreen} />
    case 'game':
      return <RamGame setScreen={setScreen} score={score} setScore={setScore} />
    case 'end-screen':
      return <RamEndScreen setScreen={setScreen} score={score} />
  }
};

export default Ram;
