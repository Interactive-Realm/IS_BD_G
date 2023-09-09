import { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';
import useWindowSize from '../../hooks/useWindowSize';
import '../../styles/tombola.css';
import { getPrice } from '../../supabase-tombola';
import { Prize } from '../../types';
import TombolaBalloon from '../TombolaBalloon';
import Logo from '/images/logos/logo-color.svg';

const Tombola = () => {
  const [hasPrize, setHasPrize] = useState(false);
  const [prize, setPrize] = useState<Prize | null>(null);
  const { width, height } = useWindowSize();

  useEffect(() => {
    (async () => {
      if (!hasPrize) return;

      const prize = await getPrice();

      if (prize) {
        setPrize(prize);
      } else {
        setPrize({
          name: 'Nitte',
          message: 'Desværre ingen gevinst denne gang',
        });
      }
    })();
  }, [hasPrize]);

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

        {prize.name !== 'Nitte' && (
          <ReactConfetti
            width={width}
            height={height}
            colors={['blue', 'red']}
            gravity={0.05}
            numberOfPieces={50}
          />
        )}
      </div>
    );
  } else {
    component = (
      <div className="tombola__game">
        {/* <FlagBackground /> */}
        <ReactConfetti
          width={width}
          height={height}
          colors={['blue']}
          gravity={0.05}
          numberOfPieces={20}
        />
        {/* <ReactConfetti
          width={width}
          height={height}
          colors={['blue', 'red']}
          gravity={0.02}
          numberOfPieces={50}
          drawShape={(ctx) => {
            const img = new Image();
            img.src = '/images/assets/flag.png';
            ctx.drawImage(img, 0, 0, 45, 45);
          }}
        /> */}
        <p className="tombola__game__info blue-bold">
          <span>POP EN BALLON</span>
        </p>
        <div className="tombola__balloons">
          <TombolaBalloon setHasPrize={setHasPrize} color="blue">
            <img
              src="/images/assets/balloon_red.png"
              alt=""
              draggable={false}
            />
          </TombolaBalloon>
          <TombolaBalloon setHasPrize={setHasPrize} color="red">
            <img
              src="/images/assets/balloon_shoe.png"
              alt=""
              draggable={false}
            />
          </TombolaBalloon>
          <TombolaBalloon setHasPrize={setHasPrize} color="blue">
            <img
              src="/images/assets/balloon_red.png"
              alt=""
              draggable={false}
            />
          </TombolaBalloon>
          <TombolaBalloon setHasPrize={setHasPrize} color="red">
            <img
              src="/images/assets/balloon_jacket.png"
              alt=""
              draggable={false}
            />
          </TombolaBalloon>
          <TombolaBalloon setHasPrize={setHasPrize} color="blue">
            <img
              src="/images/assets/balloon_red.png"
              alt=""
              draggable={false}
            />
          </TombolaBalloon>
        </div>
      </div>
    );
  }

  return <div className="tombola">{component}</div>;
};

export default Tombola;
