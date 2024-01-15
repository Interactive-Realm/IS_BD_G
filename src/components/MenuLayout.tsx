// import { FlagThing } from "./animations/FlagThing";

type Props = {
  children: React.ReactNode;
};

export const MenuLayout = ({ children }: Props) => {
  return (
    <div className="menu-layout">
      {/* <FlagThing/> */}
      <main>
        <div className="menu-layout__content">
          {children}
        </div>
      </main>
      <footer>
        <img className="menu-logo" src="/images/logos/logo-payoff-color.svg" alt="intersport logo" />
      </footer>
    </div>
  );
};
