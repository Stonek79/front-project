import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './MainPagePicturesCarousel.module.scss'

interface MainPagePicturesCarouselProps {
    className?: string
}

export const MainPagePicturesCarousel = memo(
    (props: MainPagePicturesCarouselProps) => {
        const { className } = props
        const { t } = useTranslation()

        const cn = classNames(cls.MainPagePicturesCarousel, {}, [className])

        return <div className={cn}>{}</div>
    },
)
