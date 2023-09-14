import { useEffect, useState } from "react";
import "../../styles/tombola.css";
import { getPrice } from "../../supabase-tombola";
import { Prize } from "../../types";
import TombolaBalloon from "../TombolaBalloon";
import { FlagThing } from "../animations/FlagThing";
import Logo from "/images/logos/logo-color.svg";

const Tombola = () => {
  const [hasPrize, setHasPrize] = useState(false);
  const [prize, setPrize] = useState<Prize | null>(null);

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

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the default context menu behavior
  };

  let component;
  if (prize) {
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
      </div>
    );
  } else {
    component = (
      <div className="tombola__game">
        {/* <FlagBackground /> */}
        <FlagThing />
        <p className="tombola__game__info blue-bold">
          <span>POP EN BALLON</span>
        </p>
        <div className="tombola__balloons">
          <TombolaBalloon setHasPrize={setHasPrize} color="blue">
            <img
              src="/images/assets/balloon_red.png"
              alt=""
              draggable={false}
              onContextMenu={handleContextMenu}
            />
          </TombolaBalloon>
          <TombolaBalloon setHasPrize={setHasPrize} color="red">
            <img
              src="/images/assets/balloon_shoe.png"
              alt=""
              draggable={false}
              onContextMenu={handleContextMenu}
            />
          </TombolaBalloon>
          <TombolaBalloon setHasPrize={setHasPrize} color="blue">
            <img
              src="/images/assets/balloon_red.png"
              alt=""
              draggable={false}
              onContextMenu={handleContextMenu}
            />
          </TombolaBalloon>
          <TombolaBalloon setHasPrize={setHasPrize} color="red">
            <img
              src="/images/assets/balloon_jacket.png"
              alt=""
              draggable={false}
              onContextMenu={handleContextMenu}
            />
          </TombolaBalloon>
          <TombolaBalloon setHasPrize={setHasPrize} color="blue">
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
      {component}
    </div>
  );
};

export default Tombola;
