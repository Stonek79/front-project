import { useTranslation } from 'react-i18next'
import { Text } from '@/shared/ui/redesigned/Text'
import cls from './MainBlock.module.scss'
import { greetingEng, greetingRu, myLogoPath } from '@/shared/const/contacts'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'

export const MainBlock = () => {
    const { i18n } = useTranslation()
    const isRuLng = i18n.language === 'ru'

    const fallback = (
        <Skeleton className={cls.img} width={350} height={350} border="50%" />
    )

    return (
        <>
            <Text
                className={cls.text}
                size="l"
                variant="accent"
                text={isRuLng ? greetingRu : greetingEng}
            />
            <div className={cls.imgContainer}>
                <AppImage
                    fallback={fallback}
                    className={cls.img}
                    src={myLogoPath}
                    alt="My photo"
                    width="100%"
                />
            </div>
        </>
    )
}
