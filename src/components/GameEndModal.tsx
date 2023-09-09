import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getHighscores,
  getUser,
  getUserWeeklyHighscore,
  insertScore,
} from '../supabase-ram';
import { UserHighscore } from '../types';
import { formatScore } from '../utils';
import HighscoreList from './highscore/HighscoreList';
import SignInForm from './input/forms/SignInForm';
import SignUpForm from './input/forms/SignUpForm';
import Backdrop from './utils/Backdrop';

type Props = {
  score: number;
};

const GameEndModal = ({ score }: Props) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [highscore, setHighscore] = useState<number | null>(null);
  const [weeklyHighscores, setWeeklyHighscores] = useState<UserHighscore[]>([]);
  const [screen, setScreen] = useState<
    'signed-in' | 'not-signed-in' | 'sign-in' | 'sign-up'
  >('not-signed-in');
  const navigate = useNavigate();

  const saveScore = useCallback(async () => {
    await insertScore(score);
  }, [score]);

  useEffect(() => {
    (async () => {
      const user = await getUser();
      setIsSignedIn(user !== null);
      setScreen(user ? 'signed-in' : 'not-signed-in');

      if (user) {
        const h = await getUserWeeklyHighscore();
        if (h) setHighscore(h.highscore);
      }

      setWeeklyHighscores(await getHighscores());
    })();
  }, [saveScore]);

  const handleGotoMenu = async () => {
    await saveScore();
    navigate('/');
  };

  return (
    <Backdrop>
      <div className="modal">
        <img
          className="modal__logo"
          src="/images/logos/logo-color.svg"
          alt="intersport logo"
        />

        {screen === 'not-signed-in' && (
          <>
            <div className="score-box">
              <p>DIN SCORE</p>
              <h1 className="red-bold">
                <span>{formatScore(score)}</span>
              </h1>
            </div>
            <div className="ram__sign-in__info">
              <HighscoreList highscores={weeklyHighscores} />
              <p>Log ind for at være med i lodtrækningen om fede præmier.</p>
              <div className="button-group">
                <button
                  className="button primary"
                  onClick={() => setScreen('sign-in')}>
                  LOG IND
                </button>
                <button
                  className="button secondary text"
                  onClick={() => setScreen('sign-up')}>
                  OPRET BRUGER
                </button>
              </div>
            </div>
          </>
        )}

        {screen === 'signed-in' && (
          <>
            <div className="score-box">
              <p>DIN SCORE</p>
              <h1 className="red-bold">
                <span>{formatScore(score)}</span>
              </h1>
            </div>

            <div className="score-box">
              <p>DIN HIGHSCORE</p>
              <h1 className="red-bold">
                <span>
                  {highscore !== null && highscore > score
                    ? formatScore(highscore)
                    : formatScore(score)}
                </span>
              </h1>
            </div>

            {highscore !== null && score > highscore && (
              <p>Du slog din highscore, flot klaret!</p>
            )}

            <div className="button-group">
              <button
                className="button primary"
                onClick={() => {
                  navigate(0);
                }}>
                SPIL IGEN
              </button>
              <button className="button text" onClick={handleGotoMenu}>
                GÅ TIL MENU
              </button>
            </div>
          </>
        )}

        {screen === 'sign-in' && (
          <>
            <h2>LOG IND</h2>
            <SignInForm onSignIn={handleGotoMenu} />
            <div className="button-group">
              <button
                className="button secondary text"
                onClick={() => setScreen('sign-up')}>
                OPRET BRUGER
              </button>
            </div>
          </>
        )}

        {screen === 'sign-up' && (
          <>
            <h2>OPRET BRUGER</h2>
            <SignUpForm onSignUp={handleGotoMenu} />
            <div className="button-group">
              <button
                className="button secondary text"
                onClick={() => setScreen('sign-in')}>
                LOG IND
              </button>
            </div>
          </>
        )}
      </div>
    </Backdrop>
  );
};

export default GameEndModal;
