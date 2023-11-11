import { Story } from '@storybook/react'
import { Theme } from '@/shared/const/theme'
// eslint-disable-next-line fsd-paths-checker-plugin/layer-import-control
import { ThemeProvider } from '@/app/providers/ThemeProvider'

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) =>
    (
        <ThemeProvider initialTheme={theme}>
            <div className={theme}>
                <StoryComponent />
            </div>
        </ThemeProvider>
    )
