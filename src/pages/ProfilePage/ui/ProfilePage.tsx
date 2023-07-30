import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/Page'
import { ProfilePageEdit } from '@/features/ProfilePageEdit'
import { ProfileRating } from '@/features/ProfileRating'

interface ProfilePageProps {
    className?: string
}

const ProfilePage = (props: ProfilePageProps) => {
    const { className } = props
    const { t } = useTranslation()
    const { id } = useParams<{ id: string }>()

    const cn = classNames('', {}, [className])

    if (!id && __PROJECT__ !== 'storybook') {
        return <Page className={cn}>{t('Profile page error')}</Page>
    }

    return (
        <Page className={cn} data-testid="ProfilePage">
            <VStack gap="16" max>
                <ProfilePageEdit id={id} />
                <ProfileRating userId={id} />
            </VStack>
        </Page>
    )
}

export default memo(ProfilePage)
