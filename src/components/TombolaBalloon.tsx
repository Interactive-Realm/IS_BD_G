import { getPrice } from '../supabase-tombola';
import { Prize } from '../types';

type Props = {
  setPrize: React.Dispatch<React.SetStateAction<Prize | null>>;
  color: 'red' | 'blue';
};

const TombolaBalloon = ({ setPrize, color }: Props) => {
  const handleClick = async () => {
    const prize = await getPrice();

    if (prize) {
      setPrize(prize);
    } else {
      setPrize({
        name: 'Nitte',
        message: 'Desværre ingen gevinst denne gang',
      });
    }
  };

  return (
    <span
      onMouseDown={handleClick}
      onTouchStart={handleClick}
      className={`tombola__balloon ${color}`}
    />
  );
};

export default TombolaBalloon;
