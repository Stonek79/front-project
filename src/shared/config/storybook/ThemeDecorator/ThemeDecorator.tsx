import { Story } from '@storybook/react'
import { Theme } from '@/shared/const/theme'
// eslint-disable-next-line fsd-paths-checker-plugin/layer-import-control
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { getFeatureFlags } from '@/shared/lib/features/lib/setGetFeaturs'

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => {
    const flag = getFeatureFlags('isAppRedesigned')
    return (
        <ThemeProvider initialTheme={theme}>
            <div className={`app${flag && '-redesigned'} ${theme}`}>
                <StoryComponent />
            </div>
        </ThemeProvider>
    )
}
