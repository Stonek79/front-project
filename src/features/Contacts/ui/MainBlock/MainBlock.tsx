import { useTranslation } from 'react-i18next'
import { Text } from '@/shared/ui/redesigned/Text'
import cls from './MainBlock.module.scss'
import { greetingEng, greetingRu, myLogoPath } from '@/shared/const/contacts'
import { AppImage } from '@/shared/ui/redesigned/AppImage'

export const MainBlock = () => {
    const { i18n } = useTranslation()
    const isRuLng = i18n.language === 'ru'

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
                    className={cls.img}
                    src={myLogoPath}
                    alt="My photo"
                    width="100%"
                />
            </div>
        </>
    )
}
