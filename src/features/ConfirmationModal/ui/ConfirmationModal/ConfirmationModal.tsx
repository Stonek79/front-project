import { memo, Suspense } from 'react'
import { Modal } from '@/shared/ui/redesigned/Modal'
import { Loader } from '@/shared/ui/redesigned/Loader'
import ConfirmationModalForm from '../ConfirmationModalForm/ConfirmationModalForm'

interface ConfirmationModalProps {
    className?: string
    isOpen?: boolean
    onClose: () => void
    header?: string
    onConfirm: () => void
}

export const ConfirmationModal = memo((props: ConfirmationModalProps) => {
    const { isOpen, header, onClose, onConfirm } = props

    return (
        <Modal lazy isOpen={isOpen} onClose={onClose}>
            <Suspense fallback={<Loader />}>
                <ConfirmationModalForm
                    onConfirm={onConfirm}
                    header={header}
                    onCancel={onClose}
                />
            </Suspense>
        </Modal>
    )
})
