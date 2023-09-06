import Backdrop from './Backdrop';

export interface ModalProps {
  isShown: boolean;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

const Modal = ({ isShown, children }: ModalProps) => {
  if (isShown) {
    <Backdrop>
      <div className="modal">{children}</div>;
    </Backdrop>;
  }
};

export default Modal;
