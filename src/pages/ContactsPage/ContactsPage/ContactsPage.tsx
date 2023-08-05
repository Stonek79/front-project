import React from 'react'
import { useTranslation } from 'react-i18next'
import { Page } from '@/widgets/Page'
import { Text } from '@/shared/ui/redesigned/Text'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { tel, email } from '@/shared/const/contacts'
import cls from './ContactsPage.module.scss'

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
