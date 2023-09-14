import { useEffect } from "react";
import { Balloon as BalloonType } from "../types";

type Props = {
  balloon: BalloonType;
  handleDestroy: () => void;
};

const PoppedBalloon = ({ handleDestroy, balloon }: Props) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      handleDestroy();
    }, 180);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <span
      className="balloon"
      style={{ left: `${balloon.x}%`, top: `${balloon.y}%` }}
    >
      <img
        src="/images/assets/BalloonPopAnim.gif"
        alt="hvid ballon"
        draggable={false}
      />
    </span>
  );
};

export default PoppedBalloon;
