import { Balloon as BalloonType } from '../types';

type Props = {
  balloon: BalloonType;
  handleClick: () => void;
};

const Balloon = ({ handleClick, balloon }: Props) => {
  return (
    <span
      onMouseDown={handleClick}
      onTouchStart={handleClick}
      className="balloon"
      style={{ left: `${balloon.x}%`, top: `${balloon.y}%` }}
      onClick={() => {
        handleClick();
      }}>
      <img
        src="/images/assets/balloon_red_600.png"
        alt="hvid ballon"
        draggable={false}
      />
    </span>
  );
};

export default Balloon;
