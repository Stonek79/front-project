import { Suspense } from 'react'
import { Modal } from '@/shared/ui/Modal'
import { Loader } from '@/shared/ui/Loader'
import { LoginFormAsync } from '../LoginForm/LoginForm.async'

interface LoginModalProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export const LoginModal = (props: LoginModalProps) => {
    const { isOpen, onClose } = props

    return (
        <Modal
            lazy
            isOpen={isOpen}
            onClose={onClose}
        >
            <Suspense fallback={<Loader />}>
                <LoginFormAsync />
            </Suspense>
        </Modal>
    );
};
