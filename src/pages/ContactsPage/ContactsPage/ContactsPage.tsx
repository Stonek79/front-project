import React from 'react'
import { useTranslation } from 'react-i18next'
import { Page } from '@/widgets/Page'
import { Text } from '@/shared/ui/redesigned/Text'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { tel, email, tg } from '@/shared/const/contacts'
import cls from './ContactsPage.module.scss'
import { Icon } from '@/shared/ui/redesigned/Icon'
import TG from '@/shared/assets/icons/telegram.svg'

const ContactsPage = () => {
    const { t } = useTranslation()

    return (
        <Page data-testid="ContactsPage">
            <VStack gap="32">
                <Text
                    title={t('Contacts page')}
                    text={t('The page is in development')}
                />

                <address>
                    <Text text={t('You can email me:')} />
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
                    <Text text={t('Or you call me:')} />
                    <a className={cls.tel} href="tel:+79688246859">
                        {tel}
                    </a>
                </address>
            </VStack>
        </Page>
    )
}

export default ContactsPage
