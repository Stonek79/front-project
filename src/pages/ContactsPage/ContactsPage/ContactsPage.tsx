import React from 'react'
import { useTranslation } from 'react-i18next'
import { Page } from '@/widgets/Page'
import { Text } from '@/shared/ui/redesigned/Text'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import {
    tel,
    email,
    tg,
    callText,
    emailText,
    greetingEng,
    greetingRu,
    emailTextRu,
    callTextRu,
    hhRu,
    hh,
    hhLink,
    hhLogoPath,
    myLogoPath,
} from '@/shared/const/contacts'
import cls from './ContactsPage.module.scss'
import { Icon } from '@/shared/ui/redesigned/Icon'
import TG from '@/shared/assets/icons/telegram.svg'
import { AppImage } from '@/shared/ui/redesigned/AppImage'

const ContactsPage = () => {
    const { t, i18n } = useTranslation()
    // TODO add this to translation an About page too
    const isRuLng = i18n.language === 'ru'

    return (
        <Page data-testid="ContactsPage">
            <VStack gap="32">
                <Text
                    title={t('Contacts page')}
                    text={t('The page is in development')}
                />

                <Text
                    className={cls.text}
                    size="l"
                    variant="accent"
                    text={isRuLng ? greetingRu : greetingEng}
                />
                <AppImage className={cls.img} src={myLogoPath} width={450} />
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
                            width={18}
                        />
                        <a target="_blank" href={hhLink} rel="noreferrer">
                            {isRuLng ? hhRu : hh}
                        </a>
                    </HStack>
                </address>
            </VStack>
        </Page>
    )
}

export default ContactsPage
