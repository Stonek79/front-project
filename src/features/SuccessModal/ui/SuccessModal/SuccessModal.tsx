import { memo, Suspense } from 'react'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import cls from './SuccessModal.module.scss'
import { Loader } from '@/shared/ui/redesigned/Loader'
import { Modal } from '@/shared/ui/redesigned/Modal'
import { Card } from '@/shared/ui/redesigned/Card'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'
import { Text } from '@/shared/ui/redesigned/Text'

export interface SuccessModalProps {
    className?: string
    isOpen?: boolean
    onClose: () => void
    text: string
}

const SuccessModal = memo((props: SuccessModalProps) => {
    const { className, onClose, isOpen, text } = props
    const { close, isClosing } = useModal({
        onClose,
        isOpen,
    })

    const mods: Mods = {
        [cls.isClosing]: isClosing,
    }

    const cn = classNames(cls.content, mods, [className])

    return (
        <Modal clearBack className={cn} isOpen={isOpen} onClose={onClose}>
            <Suspense fallback={<Loader />}>
                <Card
                    clickable
                    gap="0"
                    variant="clear"
                    cardBorder="none"
                    onClick={close}
                >
                    <Text title={text} variant="error" />
                </Card>
            </Suspense>
        </Modal>
    )
})

export default SuccessModal
