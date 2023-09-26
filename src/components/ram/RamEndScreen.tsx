import { useCallback, useEffect, useState } from "react";
import { getHighscores, getUser, insertScore } from "../../supabase-ram";
import { UserHighscore } from "../../types";
import { formatScore } from "../../utils";
import { MenuLayout } from "../MenuLayout";
import HighscoreList from "../highscore/HighscoreList";
import SignUpForm from "../input/forms/SignUpForm";
import { RamScreen } from "../routes/Ram";

interface Props {
  setScreen: React.Dispatch<React.SetStateAction<RamScreen>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const RamEndScreen = ({ setScreen, score, setScore }: Props) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [weeklyHighscores, setWeeklyHighscores] = useState<UserHighscore[]>([]);

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
  };

  const handlePlayAgain = async () => {
    if (score > 0) await saveScore();
    setScore(0);
    setScreen("game");
  };

  const handleSignUp = () => {
    signIn();
  };

  return (
    <MenuLayout>
      {isSignedIn ? (
        <>
          <h1 className="is-bold end-screen__title">
            <span className="blue">DIN SCORE</span>
            <span className="red">{formatScore(score, 4)}</span>
            <span className="blue">UGENS TOP 10</span>
          </h1>

          <HighscoreList highscores={weeklyHighscores} />

          <img
            src="/images/assets/RAM_MockUp_Elements/spilhverdag.png"
            alt="spil hverdag"
          />

          <div className="button-group">
            <button className="button primary" onClick={handlePlayAgain}>
              SPIL IGEN
            </button>
            <button className="button text">
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
          Ved at klikke på "Deltag i konkurrencen" accepterer du at modtage INTERSPORTS nyhedsbrev fra Club INTERSPORT. 
          Nyhedsbrevet indeholder nyheder og tilbud fra INTERSPORTs sortiment. Samtykket kan til enhver tid trækkes tilbage.
          </p>
          <SignUpForm onSignUp={handleSignUp} />
        </>
      )}
    </MenuLayout>
  );
};

export default RamEndScreen;
