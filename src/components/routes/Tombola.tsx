
import React, { useEffect, useState } from "react";
import "../../styles/tombola.css";
import { getPrice } from "../../supabase-tombola";
import { Prize } from "../../types";
import TombolaBalloon from "../TombolaBalloon";
import { FlagThing } from "../animations/FlagThing";
import Logo from "/images/logos/logo-color.svg";
import PrizeConfetti from "../PrizeConfetti";

const Tombola = () => {
  const [hasPrize, setHasPrize] = useState(false);
  const [prize, setPrize] = useState<Prize | null>(null);
  const [expandingBalloon, setExpandingBalloon] = useState<number | null>(null);
  const [isAnyBalloonClicked, setIsAnyBalloonClicked] = useState(false);
  const [testingMode, setTestingMode] = useState(false); // Add testing mode state

  useEffect(() => {
    (async () => {
      if (!hasPrize) return;
  
      const prize = await getPrice();
  
      if (prize) {
        setPrize(prize);
      } else {
        setPrize({
          name: "Nitte",
          message: "Desværre ingen gevinst denne gang",
        });
      }
    })();
  }, [hasPrize]);

  const toggleTestingMode = () => {
    setTestingMode((prevTestingMode) => !prevTestingMode);
  };

  const handleButtonClick = async () => {
    try {
      const prize = await getPrice();
      if (prize) {
        setPrize(prize);
        setHasPrize(true);
      } else {
        setPrize({
          name: "Nitte",
          message: "Desværre ingen gevinst denne gang",
        });
      }
    } catch (error) {
      console.error("Error fetching prize:", error);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the default context menu behavior
  };

  const handleBalloonClick = (balloonIndex: number) => {
    if (expandingBalloon === null) {
      setIsAnyBalloonClicked(true);
      setExpandingBalloon(balloonIndex);
    } else if (expandingBalloon === balloonIndex) {
      setIsAnyBalloonClicked(false);
      setExpandingBalloon(null);
    }
  };

  let component;
  if (prize && !testingMode) { // Check if it's not in testing mode
    component = (
      <div className="tombola__result">
        <div className="tombola__result__prize">
          <img className="tombola__logo" src={Logo} alt="intersport logo" />
          <p className="red-bold">
            <span>{prize.message}</span>
          </p>
        </div>
        <span className="tombola__element tombola__element1">
          <img
            src="/images/assets/balloon_white.png"
            alt="ballon jakke"
            draggable={false}
          />
        </span>
        <span className="tombola__element tombola__element2">
          <img
            src="/images/assets/balloon_white.png"
            alt="ballon jakke"
            draggable={false}
          />
        </span>
        <span className="tombola__element tombola__element3">
          <img
            src="/images/assets/balloon_white.png"
            alt="ballon jakke"
            draggable={false}
          />
        </span>
        <span className="tombola__element tombola__element4">
          <img
            src="/images/assets/balloon_jacket.png"
            alt="ballon jakke"
            draggable={false}
          />
        </span>
        <span className="tombola__element tombola__element5">
          <img
            src="/images/assets/balloon_shoe_string.png"
            alt="ballon jakke"
          />
        </span>
        <FlagThing />
        <PrizeConfetti />
      </div>
    );
  } else {
    component = (
      <div className="tombola__game">
        <FlagThing />
        <p className="tombola__game__info blue-bold">
          <span>POP EN BALLON</span>
          <button
            type="button"
            className="testButton"
            onClick={handleButtonClick}
          >
            Click Me
          </button>
        </p>
        <div className="tombola__balloons">
          <TombolaBalloon
            setHasPrize={setHasPrize}
            color="blue"
            onClick={() => handleBalloonClick(1)}
            isExpanding={expandingBalloon === 1}
            isAnyBalloonClicked={isAnyBalloonClicked}
          >
            <img
              src="/images/assets/balloon_red.png"
              alt=""
              draggable={false}
              onContextMenu={handleContextMenu}
            />
          </TombolaBalloon>
          <TombolaBalloon
            setHasPrize={setHasPrize}
            color="red"
            onClick={() => handleBalloonClick(2)}
            isExpanding={expandingBalloon === 2}
            isAnyBalloonClicked={isAnyBalloonClicked}
          >
            <img
              src="/images/assets/balloon_shoe.png"
              alt=""
              draggable={false}
              onContextMenu={handleContextMenu}
            />
          </TombolaBalloon>
          <TombolaBalloon
            setHasPrize={setHasPrize}
            color="blue"
            onClick={() => handleBalloonClick(3)}
            isExpanding={expandingBalloon === 3}
            isAnyBalloonClicked={isAnyBalloonClicked}
          >
            <img
              src="/images/assets/balloon_red.png"
              alt=""
              draggable={false}
              onContextMenu={handleContextMenu}
            />
          </TombolaBalloon>
          <TombolaBalloon
            setHasPrize={setHasPrize}
            color="red"
            onClick={() => handleBalloonClick(4)}
            isExpanding={expandingBalloon === 4}
            isAnyBalloonClicked={isAnyBalloonClicked}
          >
            <img
              src="/images/assets/balloon_jacket.png"
              alt=""
              draggable={false}
              onContextMenu={handleContextMenu}
            />
          </TombolaBalloon>
          <TombolaBalloon
            setHasPrize={setHasPrize}
            color="blue"
            onClick={() => handleBalloonClick(5)}
            isExpanding={expandingBalloon === 5}
            isAnyBalloonClicked={isAnyBalloonClicked}
          >
            <img
              src="/images/assets/balloon_red.png"
              alt=""
              draggable={false}
              onContextMenu={handleContextMenu}
            />
          </TombolaBalloon>
        </div>
      </div>
    );
  }

  return (
    <div className="tombola">
      <button onClick={toggleTestingMode}>
        Toggle Testing Mode
      </button>
      {component}
    </div>
  );
};

export default Tombola;
