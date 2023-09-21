import { UserHighscore } from '../../types';
import { formatScore } from '../../utils';

type Props = {
  rank: number;
  highscore: UserHighscore;
};

const HighscoreItem = ({ rank, highscore }: Props) => {
  return (
    <li key={highscore.user_id} className="highscore-list__item">
      <span className="flex gap-3 items-center">
        <span className="text-gray-500">{rank}</span>
        <span>
                  {highscore.first_name} {highscore.last_name[0]}.
        </span>
      </span>
      <span>{formatScore(highscore.highscore)}</span>
    </li>
  );
};

export default HighscoreItem;
