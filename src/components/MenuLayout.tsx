type Props = {
  children: React.ReactNode;
};

export const MenuLayout = ({ children }: Props) => {
  return (
    <div className="menu-layout">
      <main>{children}</main>
      <div className="menu-footer-placeholder"></div>
      <footer>
        <img className="menu-logo" src="/images/logos/logo-payoff-color.svg" alt="intersport logo" />
      </footer>
    </div>
  );
};
