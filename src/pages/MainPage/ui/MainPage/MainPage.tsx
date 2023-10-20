import { memo } from 'react'
import { Page } from '@/widgets/Page'
import { MainPageGreeting } from '@/widgets/MainPageGreeting'
import { TagsLayout } from '@/shared/layouts'
import cls from './MainPage.module.scss'

const MainPage = () => (
    <Page className={cls.MainPage} data-testid="MainPage">
        <TagsLayout>
            <MainPageGreeting />
        </TagsLayout>
    </Page>
)

export default memo(MainPage)
