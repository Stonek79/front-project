import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ScrollToTopButton.module.scss'
import { Icon } from '@/shared/ui/redesigned/Icon'
import UpIcon from '@/shared/assets/icons/circle-up.svg'

interface ScrollToTopButtonProps {
    className?: string
}

export const ScrollToTopButton = memo((props: ScrollToTopButtonProps) => {
    const { className } = props

    const cn = classNames(cls.ScrollToTopButton, {}, [className])

    const onClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'auto',
        })
    }
    return (
        <Icon
            Svg={UpIcon}
            onClick={onClick}
            clickable
            width={32}
            height={32}
            className={cn}
        />
    )
})
