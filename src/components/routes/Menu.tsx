import { MenuLayout } from '../MenuLayout';
import { FlagThing } from '../animations/FlagThing';

const Menu = () => {
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
          <a href="/ram" className="button primary">
            SPIL & VIND
          </a>

          <a href="/ram" className="button text">
            *Se konkurrencebetingelser her
          </a>
        </div>
        <div className="menu-footer-logo">
          <img className="menu-logo" src="/images/logos/logo-payoff-color.svg" alt="intersport logo" />
        </div>
          
      </MenuLayout>
    </>
  );
};

export default Menu;
