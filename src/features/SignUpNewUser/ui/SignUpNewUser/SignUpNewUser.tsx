import { memo, Suspense } from 'react'
import { Modal } from '@/shared/ui/redesigned/Modal'
import { Loader } from '@/shared/ui/redesigned/Loader'
import { SignUpNewUserFormAsync } from '../SignUpNewUserForm/SignUpNewUserForm.async'

interface SignUpNewUserProps {
    isOpen?: boolean
    onClose?: () => void
}

export const SignUpNewUser = memo((props: SignUpNewUserProps) => {
    const { isOpen, onClose } = props

    return (
        <Modal lazy isOpen={isOpen} onClose={onClose}>
            <Suspense fallback={<Loader />}>
                <SignUpNewUserFormAsync />
            </Suspense>
        </Modal>
    )
})
