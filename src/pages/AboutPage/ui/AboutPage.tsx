import React from 'react'
import { Page } from '@/widgets/Page'
import { AboutPageInforBlock } from '@/widgets/AboutPageInfoBlock'
import { TagsLayout } from '@/shared/layouts'

const AboutPage = () => (
    <Page data-testid="AboutPage">
        <TagsLayout>
            <AboutPageInforBlock />
        </TagsLayout>
    </Page>
)

export default AboutPage
