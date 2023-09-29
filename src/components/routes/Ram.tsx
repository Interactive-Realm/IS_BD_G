import { useState } from "react";
import RamEndScreen from "../ram/RamEndScreen";
import RamGame from "../ram/RamGame";
import RamMenu from "../ram/RamMenu";
import CountdownScreen from "../ram/CountdownScreen";

export type RamScreen = "menu" | "game" | "end-screen" | "countdown-screen";

const Ram = () => {
  const [screen, setScreen] = useState<RamScreen>("end-screen");
  const [score, setScore] = useState(0);

  let component;
  switch (screen) {
    case "menu":
      component = <RamMenu setScreen={setScreen} />;
      break;
    case "countdown-screen":
      component = <CountdownScreen setScreen={setScreen}/>;
      break;
    case "game":
      component = (
        <RamGame setScreen={setScreen} score={score} setScore={setScore} />
      );
      break;
    case "end-screen":
      component = <RamEndScreen setScreen={setScreen} score={score} setScore={setScore} />;
      break;
  }

  return (
    <div>
      <div className="ram">
        <div className="is-background"></div>
        {component}
      </div>
    </div>
  );
};

export default Ram;
