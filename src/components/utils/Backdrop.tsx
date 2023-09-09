type Props = {
  children: React.ReactNode;
  onClick?: () => void | undefined;
};

const Backdrop = ({ children, onClick }: Props) => {
  return (
    <div className="backdrop">
      {onClick !== undefined && (
        <button className="backdrop__button" onClick={onClick} />
      )}
      {children}
    </div>
  );
};

export default Backdrop;
