import { UserHighscore } from '../../types';
import HighscoreItem from './HighscoreItem';

type Props = {
  highscores: UserHighscore[];
};

const HighscoreList = ({ highscores }: Props) => {
  return (
    <ul className="highscore-list">
      {highscores.map((item, i) => (
        <HighscoreItem key={item.user_id} rank={i + 1} highscore={item} />
      ))}
    </ul>
  );
};

export default HighscoreList;
