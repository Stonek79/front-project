import { memo, Suspense } from 'react'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import cls from './BigCertificateModal.module.scss'
import { Loader } from '@/shared/ui/redesigned/Loader'
import { Modal } from '@/shared/ui/redesigned/Modal'
import { Card } from '@/shared/ui/redesigned/Card'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'

export interface BigCertificateModalProps {
    className?: string
    isOpen?: boolean
    onClose: () => void
    img: string
}

const BigCertificateModal = memo((props: BigCertificateModalProps) => {
    const { className, onClose, isOpen, img } = props
    const { close, isClosing } = useModal({
        onClose,
        isOpen,
        animationDelay: 300,
    })

    const mods: Mods = {
        [cls.isClosing]: isClosing,
    }

    const cn = classNames(cls.content, mods, [className])

    return (
        <Modal className={cn} isOpen={isOpen} onClose={onClose}>
            <Suspense fallback={<Loader />}>
                <Card clickable cardPaddings="4" onClick={close}>
                    <AppImage className={cls.img} src={img} alt="Certificate" />
                </Card>
            </Suspense>
        </Modal>
    )
})

export default BigCertificateModal
