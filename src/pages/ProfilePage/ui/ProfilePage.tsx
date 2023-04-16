import { classNames } from 'shared/lib/classNames/classNames'
import { memo } from 'react'
import { Page } from 'widgets/Page/ui/Page/Page'
import { VStack } from 'shared/ui/Stack'
import { ProfilePageEdit } from 'features/ProfilePageEdit'
import { useParams } from 'react-router-dom'
import { NotFoundPage } from 'pages/NotFoundPage'

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = (props: ProfilePageProps) => {
    const { className } = props
    const { id } = useParams<{ id: string }>()

    if (!id) {
        return (
            <NotFoundPage />
        )
    }

    const cn = classNames('', {}, [className])

    return (
        <Page className={cn}>
            <VStack gap="16" max>
                <ProfilePageEdit id={id} />
            </VStack>
        </Page>
    );
};

export default memo(ProfilePage)
