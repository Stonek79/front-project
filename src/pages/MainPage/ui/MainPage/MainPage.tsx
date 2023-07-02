import { memo } from 'react'
import { Page } from '@/widgets/Page'
import { MainPageGreeting } from '@/widgets/MainPageGreeting'

const MainPage = () => (
    <Page data-testid="MainPage">
        <MainPageGreeting />
    </Page>
)

export default memo(MainPage)
