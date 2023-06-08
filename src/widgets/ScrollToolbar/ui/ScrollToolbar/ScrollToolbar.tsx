import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ScrollToolbar.module.scss'
import { ScrollToTopButton } from '@/features/ScrollToTopButton'
import { VStack } from '@/shared/ui/redesigned/Stack'

interface ScrollToolbarProps {
    className?: string
}

export const ScrollToolbar = memo((props: ScrollToolbarProps) => {
    const { className } = props

    const cn = classNames(cls.ScrollToolbar, {}, [className])

    return (
        <VStack justify="center" align="center" max className={cn}>
            <ScrollToTopButton className={cls.btnColor} />
        </VStack>
    )
})
