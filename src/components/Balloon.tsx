import { Balloon as BalloonType } from "../types";

type Props = {
  balloon: BalloonType;
  handleClick: () => void;
};

const Balloon = ({ handleClick, balloon }: Props) => {
  const style: React.CSSProperties & { [key: string]: unknown } = {
    "--left": `${balloon.x}%`,
    top: `${balloon.y}%`,
  };

  return (
    <span
      onMouseDown={handleClick}
      onTouchStart={handleClick}
      className="balloon"
      style={style}
      onClick={handleClick}
    >
      <img
        src="/images/assets/balloon_red_600.png"
        alt="ballon"
        draggable={false}
      />
    </span>
  );
};

export default Balloon;
