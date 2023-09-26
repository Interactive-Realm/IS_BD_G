import { useState } from "react";
import { FlagThing } from "../animations/FlagThing";
import RamEndScreen from "../ram/RamEndScreen";
import RamGame from "../ram/RamGame";
import RamMenu from "../ram/RamMenu";

export type RamScreen = "menu" | "game" | "end-screen";

const Ram = () => {
  const [screen, setScreen] = useState<RamScreen>("end-screen");
  const [score, setScore] = useState(0);

  let component;
  switch (screen) {
    case "menu":
      component = <RamMenu setScreen={setScreen} />;
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
      <FlagThing />
      <div className="ram">
        <div className="is-background"></div>
        {component}
      </div>
    </div>
  );
};

export default Ram;
