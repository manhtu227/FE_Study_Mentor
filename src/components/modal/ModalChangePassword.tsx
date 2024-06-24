import ChangePasswordForm from '@components/form/ChangePasswordForm';
import { Modal } from 'antd';

function ModalChangePassword({
    setShowModal,
    isShow,
}: {
    setShowModal: (value: boolean) => void;
    isShow: boolean;
}) {
    const handleOk = () => {
        setShowModal(false);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    return (
        <Modal
            open={isShow}
            className='!w-[700px] flex flex-col text-left'
            footer={null}
            closable={false}
        >
            <ChangePasswordForm onSaveForm={handleOk} onCancelForm={handleCancel} />
        </Modal>
    );
}

export default ModalChangePassword;
