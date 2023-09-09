import Modal, { ModalProps } from '../../utils/Modal';
import SignInForm from '../forms/SignInForm';

type Props = {
  onSignIn: () => void;
} & ModalProps;

const SignInModal = ({ isShown, setIsShown, onSignIn }: Props) => {
  return (
    <Modal isShown={isShown} setIsShown={setIsShown}>
      <h2>LOG IND</h2>
      <SignInForm onSignIn={onSignIn} />
      <button className="button text secondary">OPRET BRUGER</button>
    </Modal>
  );
};

export default SignInModal;
