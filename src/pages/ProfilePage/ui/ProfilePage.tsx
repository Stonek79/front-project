import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/Page'
import { VStack } from '@/shared/ui/Stack'
import { ProfilePageEdit } from '@/features/ProfilePageEdit'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProfileRating } from '@/features/ProfileRating';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = (props: ProfilePageProps) => {
    const { className } = props
    const { id } = useParams<{ id: string }>()

    if (!id && __PROJECT__ !== 'storybook') {
        return (
            <NotFoundPage />
        )
    }

    const cn = classNames('', {}, [className])

    return (
        <Page className={cn}>
            <VStack gap="16" max>
                <ProfilePageEdit id={id} />
                <ProfileRating userId={id} />
            </VStack>
        </Page>
    );
};

export default memo(ProfilePage)
