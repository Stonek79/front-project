import { memo } from 'react'
import { Page } from '@/widgets/Page'
import { MainPageGreeting } from '@/widgets/MainPageGreeting'
import { TagsLayout } from '@/shared/layouts'

const MainPage = () => (
    <Page data-testid="MainPage">
        <TagsLayout>
            <MainPageGreeting />
        </TagsLayout>
    </Page>
)

export default memo(MainPage)
