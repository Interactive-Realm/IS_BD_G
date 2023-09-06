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
      onClick={handleClick}></span>
  );
};

export default Balloon;
