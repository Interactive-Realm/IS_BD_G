type Props = {
  children: React.ReactNode;
};

export const MenuLayout = ({ children }: Props) => {
  return (
    <div className="menu-layout">
      <main>{children}</main>
    </div>
  );
};
<div className="menu-footer-logo">
        <img className="menu-logo" src="/images/logos/logo-payoff-color.svg" alt="intersport logo" />
      </div>