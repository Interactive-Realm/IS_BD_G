import { useCallback, useEffect, useState } from "react";
import { getWeeklyHighscores, getUser, insertScore, getAllTimeHighscores } from "../../supabase-ram";
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
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [weeklyHighscores, setWeeklyHighscores] = useState<UserHighscore[]>([]);
  const [allTimeHighScore, setAllTimeHighScore] = useState<UserHighscore[]>([]);

  const saveScore = useCallback(async () => {
    await insertScore(score);
  }, [score]);

  useEffect(() => {
    (async () => {
      signIn();
      
      setWeeklyHighscores(await getWeeklyHighscores());
      setAllTimeHighScore(await getAllTimeHighscores());
    })();
  }, []);


  const signIn = async () => {
    const user = await getUser();
    setIsSignedIn(user !== null);
    {if (score > 0) await saveScore();}
  };

  const handlePlayAgain = async () => {
    
    setScore(0);
    setScreen("countdown-screen");
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
                
        
        {allTimeHighScore.length > 0 ? (
          <h1 className="is-bold end-screen__title">
          <span className="blue">SPILLETS #1 {allTimeHighScore[0].first_name} {allTimeHighScore[0].last_name[0]}.</span>
          <span className="red">{formatScore(allTimeHighScore[0].highscore, 4)}</span>
          </h1>
        ) : (
          <span className="red">No high score data available</span>
        )}
      

          <img
            src="/images/assets/RAM_MockUp_Elements/spilhverdag.png"
            alt="spil hverdag"
          />

          <div className="button-group">
            <button className="button primary" onClick={handlePlayAgain}>
              SPIL IGEN
            </button>
            <p className="button text menu__konkurrencebetingelser">
          * Se konkurrencebetingelser <a href="https://www.intersport.dk/fodselsdagsspil.html" className="menu__konkurrencebetingelser underline" target="_blank">her
          </a>
          </p>
          </div>
        </>
      ) : (
        <>
          <h1 className="blue-bold">
            <span>KONKURRENCE</span>
          </h1>
          <div>
          <p>
          For at deltage i konkurrencen skal du udfylde nedenstående felter.
          <br></br>
          <br></br>
          Ved at klikke på "Deltag i konkurrencen" accepterer du at modtage INTERSPORTS nyhedsmails fra Club INTERSPORT. 
          Nyhedsbrevet indeholder nyheder og tilbud fra INTERSPORTs sortiment. Samtykket kan til enhver tid trækkes tilbage.
          </p>
          </div>
          <SignUpForm onSignUp={handleSignUp} />
        </>
      )}
    </MenuLayout>
  );
};

export default RamEndScreen;
