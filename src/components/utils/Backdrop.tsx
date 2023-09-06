type Props = {
  children: React.ReactNode;
};

const Backdrop = ({ children }: Props) => {
  return <div className="backdrop">{children}</div>;
};

export default Backdrop;
