import { useEffect, useState } from 'react';
import {
  getDate,
  getHighscores,
  getProfile,
  getUserGlobalHighscore,
  getUserWeeklyHighscore,
  supabase,
} from '../../supabase-ram';
import { Profile, UserHighscore } from '../../types';
import { formatScore } from '../../utils';
import HighscoreList from '../highscore/HighscoreList';
import SignInForm from '../input/forms/SignInForm';
import SignUpForm from '../input/forms/SignUpForm';
import Modal from '../utils/Modal';
import Overlay from '../utils/Overlay';

const Menu = () => {
  const [highscores, setHighscores] = useState<UserHighscore[]>([]);
  const [signedIn, setSignedIn] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState<
    'sign-in' | 'sign-up' | null
  >(null);
  const [weeklyHighscore, setWeeklyHighscore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);

  useEffect(() => {
    (async () => {
      setHighscores(await getHighscores());

      console.log(getDate());
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { error } = await supabase.auth.getUser();

      setSignedIn(!error);

      if (error) return;

      setUserProfile(await getProfile());

      const wh = await getUserWeeklyHighscore();
      const h = await getUserGlobalHighscore();

      console.log(h);

      if (wh) setWeeklyHighscore(wh.highscore);
      if (h) setHighscore(h.highscore);
    })();
  }, [signedIn]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setSignedIn(false);
    setUserProfile(null);
  };

  return (
    <>
      <Overlay>
        <img
          className="ram-menu__logo"
          src="/images/logos/logo-color.svg"
          alt="intersport logo"
        />

        {signedIn && (
          <div className="ram-menu__signed-in-info">
            <p className="ram-menu__signed-in-info__hello">
              Hej, {userProfile?.first_name} {userProfile?.last_name}
            </p>
            <div className="ram-menu__signed-in-info__scores">
              {highscore !== null && (
                <div className="score-box-alt">
                  <p className="score-box-alt__title">ALL TIME</p>
                  <p className="score-box-alt__score">
                    {formatScore(highscore)}
                  </p>
                </div>
              )}
              {weeklyHighscore !== null && (
                <div className="score-box-alt">
                  <p className="score-box-alt__title">UGENTLIG</p>
                  <p className="score-box-alt__score">
                    {formatScore(weeklyHighscore)}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <HighscoreList highscores={highscores} />
        <div className="button-group">
          <a href="/ram" className="button primary">
            START SPIL
          </a>
          {signedIn ? (
            <button onClick={signOut} className="button text secondary">
              LOG UD
            </button>
          ) : (
            <button
              onClick={() => {
                setShowSignInModal('sign-in');
              }}
              className="button text secondary">
              LOG IND
            </button>
          )}
        </div>
      </Overlay>

      <Modal
        isShown={showSignInModal !== null}
        setIsShown={() => {
          setShowSignInModal(null);
        }}>
        {showSignInModal === 'sign-in' && (
          <>
            <h2>LOG IND</h2>
            <SignInForm
              onSignIn={() => {
                setShowSignInModal(null);
                setSignedIn(true);
              }}
            />
            <button
              className="button text secondary"
              onClick={() => {
                setShowSignInModal('sign-up');
              }}>
              OPRET BRUGER
            </button>
          </>
        )}

        {showSignInModal === 'sign-up' && (
          <>
            <h2>OPRET BRUGER</h2>
            <SignUpForm
              onSignUp={() => {
                setShowSignInModal(null);
                setSignedIn(true);
              }}
            />
            <button
              className="button text secondary"
              onClick={() => {
                setShowSignInModal('sign-in');
              }}>
              LOG IND
            </button>
          </>
        )}
      </Modal>
    </>
  );
};

export default Menu;
