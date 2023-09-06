import { UserHighscore } from '../../types';
import HighscoreItem from './HighscoreItem';

type Props = {
  highscores: UserHighscore[];
};

const HighscoreList = ({ highscores }: Props) => {
  return (
    <div className="highscore-list">
      <h2 className="highscore-list__title">UGENTLIGE TOP 10</h2>
      <ul className="highscore-list__list">
        {highscores.map((item, i) => (
          <HighscoreItem key={item.user_id} rank={i + 1} highscore={item} />
        ))}
      </ul>
    </div>
  );
};

export default HighscoreList;
