import { Button, Modal } from 'antd';
import { useEffect, useRef } from 'react';

export type DeleteModal = {
    isOpen: boolean;
    id?: number | number[];
};

type ModalConfirmProps = {
    message: string;
    loadingMessage?: string;
    isOpen: boolean | DeleteModal;
    setIsOpen: (data?: any) => void;
    onConfirm: (id?: number | number[]) => void;
    className?: string;
    classNameMessage?: string;
    titleCancel?: string;
    titleYes?: string;
    onCancel?: () => void;
    isLoading?: boolean;
};

const ModalConfirm = ({
    message,
    loadingMessage,
    classNameMessage,
    isOpen,
    setIsOpen,
    onConfirm,
    className,
    titleCancel = 'No',
    titleYes = 'Yes',
    onCancel,
    isLoading = false,
}: ModalConfirmProps) => {
    // const [isClick, setIsClick] = useState(false);
    const idRef = useRef<number | number[] | undefined>();

    useEffect(() => {
        // setIsClick(false);
        if (typeof isOpen === 'object' && isOpen.id !== undefined) {
            idRef.current = isOpen.id;
        }
    }, [isOpen]);

    const clickConfirm = () => {
        // setIsClick(true);
        onConfirm(idRef.current);
    };

    return (
        <Modal
            open={typeof isOpen === 'object' ? isOpen.isOpen : isOpen}
            centered
            okButtonProps={{ style: { display: 'none' } }}
            cancelButtonProps={{ style: { display: 'none' } }}
            onCancel={() => onCancel ?? setIsOpen(false)}
            closable={false}
            // width={368}
            className={className}
        >
            <p className={`text-center text-lg font-medium ${classNameMessage}`}>
                {isLoading ? (
                    <>{loadingMessage ? loadingMessage : 'In progress...'}</>
                ) : (
                    <>{message}</>
                )}
            </p>

            <div className='flex justify-center w-full gap-4'>
                <Button
                    onClick={onCancel ? onCancel : () => setIsOpen(false)}
                    type='default'
                    className='bg-gray-custom-600 h-[54px] text-base text-white font-bold w-full border-gray-custom-600'
                >
                    {titleCancel}
                </Button>
                <Button
                    type='primary'
                    className='bg-primary-custom-900  h-[54px] text-base font-bold text-white w-full'
                    onClick={clickConfirm}
                    loading={isLoading}
                >
                    {titleYes}
                </Button>
            </div>
        </Modal>
    );
};

export default ModalConfirm;
