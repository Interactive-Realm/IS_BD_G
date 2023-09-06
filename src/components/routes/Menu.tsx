import { useEffect, useState } from 'react';
import { getHighscores, getProfile, supabase } from '../../supabase';
import { Profile, UserHighscore } from '../../types';
import HighscoreList from '../highscore/HighscoreList';
import SignInModal from '../input/modals/SignInModal';
import Overlay from '../utils/Overlay';

const Menu = () => {
  const [highscores, setHighscores] = useState<UserHighscore[]>([]);
  const [signedIn, setSignedIn] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);

  useEffect(() => {
    (async () => {
      setHighscores(await getHighscores());

      const { error } = await supabase.auth.getUser();

      setSignedIn(!error);
      if (error) return;

      setUserProfile(await getProfile());
    })();
  }, []);

  const handleClick = () => {
    setShowSignInModal(true);
  };

  return (
    <>
      <Overlay>
        <h1 className="text-4xl font-bold">INTERSPORT</h1>

        {signedIn && (
          <p>
            {userProfile?.first_name} {userProfile?.last_name}
          </p>
        )}

        <HighscoreList highscores={highscores} />
        <div>
          <a href="/game">SPIL NU</a>
          <button onClick={handleClick}>LOG IND</button>
        </div>
      </Overlay>
      <SignInModal isShown={showSignInModal} setIsShown={setShowSignInModal} />
      <SignInModal isShown={true} setIsShown={setShowSignInModal}></SignInModal>
    </>
  );
};

export default Menu;
