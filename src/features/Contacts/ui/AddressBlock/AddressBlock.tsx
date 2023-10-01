import { useTranslation } from 'react-i18next'
import { Text } from '@/shared/ui/redesigned/Text'
import {
    callText,
    callTextRu,
    email,
    emailText,
    emailTextRu,
    hh,
    hhLink,
    hhLogoPath,
    hhRu,
    joinMbEn,
    joinMbRu,
    mbGitHubLink,
    mbIconLink,
    mbYoutubeEn,
    mbYoutubeLink,
    mbYoutubeRu,
    memebattle,
    tel,
    tg,
} from '@/shared/const/contacts'
import cls from './AddressBlock.module.scss'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { Icon } from '@/shared/ui/redesigned/Icon'
import TG from '@/shared/assets/icons/telegram.svg'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import YouTubeIcon from '@/shared/assets/icons/youtube.svg'

export const AddressBlock = () => {
    const { i18n } = useTranslation()
    const isRuLng = i18n.language === 'ru'

    return (
        <address>
            <Text text={isRuLng ? emailTextRu : emailText} />
            <a className={cls.mail} href="mailto:stonek79@proton.me">
                {email}
            </a>
            <br />
            <HStack gap="4">
                <Icon Svg={TG} width={18} height={18} />
                <a
                    target="_blank"
                    href="https://t.me/Stonek79"
                    rel="noreferrer"
                >
                    {tg}
                </a>
            </HStack>
            <Text text={isRuLng ? callTextRu : callText} />
            <a className={cls.tel} href="tel:+79688246859">
                {tel}
            </a>
            <HStack gap="4">
                <AppImage
                    className={cls.img}
                    src={hhLogoPath}
                    alt={hh}
                    width={18}
                />
                <a target="_blank" href={hhLink} rel="noreferrer">
                    {isRuLng ? hhRu : hh}
                </a>
            </HStack>
            <Text text={memebattle} />
            <HStack gap="4">
                <AppImage
                    className={cls.img}
                    src={mbIconLink}
                    alt={memebattle}
                    width={18}
                />
                <a target="_blank" href={mbGitHubLink} rel="noreferrer">
                    {isRuLng ? joinMbRu : joinMbEn}
                </a>
            </HStack>
            <HStack gap="4">
                <Icon Svg={YouTubeIcon} width={18} height={18} />
                <a target="_blank" href={mbYoutubeLink} rel="noreferrer">
                    {isRuLng ? mbYoutubeRu : mbYoutubeEn}
                </a>
            </HStack>
        </address>
    )
}
