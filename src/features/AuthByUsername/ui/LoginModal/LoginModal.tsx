import { Suspense } from 'react'
import { Loader } from '@/shared/ui/deprecated/Loader'
import { LoginFormAsync } from '../LoginForm/LoginForm.async'
import { Modal } from '@/shared/ui/redesigned/Modal'

interface LoginModalProps {
    isOpen?: boolean
    onClose?: () => void
}

export const LoginModal = (props: LoginModalProps) => {
    const { isOpen, onClose } = props

    return (
        <Modal lazy isOpen={isOpen} onClose={onClose}>
            <Suspense fallback={<Loader />}>
                <LoginFormAsync />
            </Suspense>
        </Modal>
    )
}
