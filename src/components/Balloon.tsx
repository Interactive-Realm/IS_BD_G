import { useState } from "react";
import { Balloon as BalloonType } from "../types";

type Props = {
  balloon: BalloonType;
  handleClick: () => void;
  handleDestroy: () => void;
};

const Balloon = ({ handleClick, handleDestroy, balloon }: Props) => {
  const [isPopping, setIsPopping] = useState(false);
  
  const style: React.CSSProperties & { [key: string]: unknown } = {
    "--left": `${balloon.x}%`,
    top: `${balloon.y}%`,
  };
  
  const handlePop = () => {
    handleClick();
    setIsPopping(true);

    setTimeout(() => {
      handleDestroy();
    }, 100)
  }

  return (
    <span
      onMouseDown={handlePop}
      onTouchStart={handlePop}
      className={`balloon ${balloon.class}`}
      style={style}
      onClick={handlePop}
    >
      <img
        src={isPopping ? "/images/assets/popanim_single_frames/popanim_frame_5.png" : "/images/assets/balloon_red_600.png"}
        alt="ballon"
        draggable={false}
      />
    </span>
  );
};

export default Balloon;
