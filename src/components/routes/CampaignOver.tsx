import { MenuLayout } from '../MenuLayout';
// import { FlagThing } from '../animations/FlagThing';

const Menu = () => {
  return (
    <>
      <MenuLayout>
        <h1 className='is-bold menu-title'>
          <span className='blue'>KONKURRENCEN ER SLUT</span>
          <br />
          <span className='red'>FOR DENNE GANG</span>
        </h1>        

        <div className="menu__prizes-info">
          <h3>Mange tak for deltagelsen i vores fødselsdagskonkurrence! </h3>
          <h3>Vi ønsker dig en rigtig god dag!</h3>
        </div>        

          <p className="button text menu__konkurrencebetingelser">
          Gå til <a href="https://www.intersport.dk/" className="menu__konkurrencebetingelser underline" target="_blank">Intersport.dk
          </a>
          </p>
          
      </MenuLayout>
    </>
  );
};

export default Menu;
