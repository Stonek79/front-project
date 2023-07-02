import {
    MutableRefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'

/**
 * Reused hook for modal components (drawer/modal)
 * @param isOpen
 * @param animationDelay
 * @param onClose
 */

interface UseModalProps {
    isOpen?: boolean
    onClose?: () => void
    animationDelay?: number
}

export const useModal = (props: UseModalProps) => {
    const { isOpen, onClose, animationDelay = 300 } = props

    const [isClosing, setIsClosing] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>

    const close = useCallback(() => {
        if (onClose) {
            setIsClosing(true)

            timerRef.current = setTimeout(() => {
                onClose()
                setIsClosing(false)
            }, animationDelay)
        }
    }, [animationDelay, onClose])

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                close()
            }
        },
        [close],
    )

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown)
        }

        return () => {
            clearTimeout(timerRef.current)
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [isOpen, onKeyDown])

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true)
        }
    }, [isOpen])

    return {
        close,
        isClosing,
        isMounted,
    }
}
