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
    };

    const handlePlayAgain = async () => {
        await saveScore();
        setScreen("game");
    };

    const handleSignUp = () => {
        signIn();
    };

    // Function to toggle showLegalStuff
    const toggleLegalStuff = () => {
        setShowLegalStuff(!showLegalStuff);
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
                        <button
                            className="button text"
                            onClick={toggleLegalStuff} // Toggle showLegalStuff
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
                        INTERSPORT. Medlemskabet er gratis, og du kan til enhver tid afmelde
                        dig igen.
                    </p>
                    <SignUpForm onSignUp={handleSignUp} />
                </>
            )}
            {showLegalStuff && (
                <div>
                    {/* Display legal information here */}
                    This is where you can display legal information.
                </div>
            )}
        </MenuLayout>
    );
};

export default RamEndScreen;
