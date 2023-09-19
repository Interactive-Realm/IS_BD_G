import { useCallback, useEffect, useState } from "react";
import {
  getHighscores,
  getUser,
  insertScore
} from "../../supabase-ram";
import { UserHighscore } from "../../types";
import { formatScore } from "../../utils";
import { MenuLayout } from "../MenuLayout";
import HighscoreList from "../highscore/HighscoreList";
import SignUpForm from "../input/forms/SignUpForm";
import { RamScreen } from "../routes/Ram";

interface Props {
  setScreen: React.Dispatch<React.SetStateAction<RamScreen>>;
  score: number;
}

const RamEndScreen = ({ setScreen, score }: Props) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [weeklyHighscores, setWeeklyHighscores] = useState<UserHighscore[]>([]);
  const [showLegalStuff, setShowLegalStuff] = useState(false);

  const saveScore = useCallback(async () => {
    await insertScore(score);
  }, [score]);

  useEffect(() => {
    (async () => {
      signIn();
      
      setWeeklyHighscores(await getHighscores());
    })();
  }, []);

  const signIn = async () => {
    const user = await getUser();
    setIsSignedIn(user !== null);
  }

  const handlePlayAgain = async () => {
    await saveScore();
    setScreen("game");
  };

  const handleSignUp = () => {
    signIn();
  };

  return (
    <MenuLayout>
      {isSignedIn ? (
        <>
          <div className="end-screen__title">
            <div className="end-screen__title__score">
              <h1 className="blue-bold">
                <span>DIN SCORE</span>
              </h1>
              <h1 className="red-bold">
                <span>{formatScore(score, 4)}</span>
              </h1>
            </div>
            <h1 className="blue-bold">
              <span>UGENS TOP 10</span>
            </h1>
          </div>

          <HighscoreList highscores={weeklyHighscores} />

          <img
            src="/images/assets/RAM_MockUp_Elements/spilhverdag.png"
            alt="spil hverdag"
          />

          <div className="button-group">
            <button className="button primary" onClick={handlePlayAgain}>
              SPIL IGEN
            </button>
            <button
              className="button text"
              onClick={() => setShowLegalStuff(true)}
            >
              *Se konkurrencebetingelser her
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="blue-bold">
            <span>KONKURRENCE</span>
          </h1>
          <p>
            For at deltage i konkurrencen skal du udfylde nedenstående felter.
          </p>
          <p>
            Ved deltagelse i konkurrencen tilmelder du dig samtidig Club
            INTERSPORT. Medlemskabet er gratis og du kan til en hver tid afmelde
            dig igen.
          </p>
          <SignUpForm onSignUp={handleSignUp} />
        </>
      )}
    </MenuLayout>
  );
};

export default RamEndScreen;
