import React from 'react'
import { Page } from '@/widgets/Page'
import { AboutPageInfoBlock } from '@/widgets/AboutPageInfoBlock'
import { TagsLayout } from '@/shared/layouts'

const AboutPage = () => (
    <Page data-testid="AboutPage">
        <TagsLayout>
            <AboutPageInfoBlock />
        </TagsLayout>
    </Page>
)

export default AboutPage
