
import { MenuLayout } from '../MenuLayout';
import { FlagThing } from '../animations/FlagThing';
import { RamScreen } from '../routes/Ram';

interface Props {
    setScreen: React.Dispatch<React.SetStateAction<RamScreen>>;
}

const RamMenu = ({ setScreen }: Props) => {
 // const [showLegalStuff, setShowLegalStuff] = useState(false);

  return (
    <>
      <FlagThing />
      <MenuLayout>
        <h1 className='is-bold menu-title'>
          <span className='blue'>POP BALLONER</span>
          <br />
          <span className='red'>& VIND!</span>
        </h1>

        <img className='menu__main-prize' src="/images/assets/RAM_MockUp_Elements/tekst_hovedpræmie.png" alt="hovedpræmie - gavekort til intersport få 3500 kroner" />

        <div className="menu__prizes-info">
          <h2>PRÆMIER HVER UGE:</h2>
          <ol>
            <li>plads - voucher på 500 kr. til intersport.dk</li>
            <li>plads - voucher på 200 kr. til intersport.dk</li>
            <li>plads - voucher på 100 kr. til intersport.dk</li>
          </ol>
        </div>

        <div className="button-group">
          <button className="button primary" onClick={() => setScreen("game")}>
            SPIL & VIND
          </button>
        </div>
      </MenuLayout>
    </>
  );
};

export default RamMenu;
