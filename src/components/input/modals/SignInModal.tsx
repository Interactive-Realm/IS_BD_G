import Modal, { ModalProps } from '../../utils/Modal';
import SignInForm from '../forms/SignInForm';

const SignInModal = ({ isShown, setIsShown }: ModalProps) => {
  return (
    <Modal isShown={isShown} setIsShown={setIsShown}>
      <h2>LOG IND</h2>
      <SignInForm />
      <button className="button text secondary">OPRET BRUGER</button>
    </Modal>
  );
};

export default SignInModal;
