import Modal, { ModalProps } from '../../utils/Modal';

type Props = {
} & ModalProps;

const SignInModal = ({ isShown, setIsShown, }: Props) => {
  return (
    <Modal isShown={isShown} setIsShown={setIsShown}>
    </Modal>
  );
};

export default SignInModal;
