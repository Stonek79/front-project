// eslint-disable-next-line fsd-paths-checker-plugin/layer-import-control
import '@/app/styles/index.scss'
import { Story } from '@storybook/react'
import { setFeatureFlags } from '@/shared/lib/features'
import { FeatureFlags } from '@/shared/types/featureFlags'

export const FeatureFlagDecorator =
    (feature: FeatureFlags) => (StoryComponent: Story) => {
        setFeatureFlags(feature)
        return (
            <div className="app">
                <StoryComponent />
            </div>
        )
    }
