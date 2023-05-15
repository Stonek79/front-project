import { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { ReducersMapObject } from '@reduxjs/toolkit'
import i18nForTests from '@/shared/config/i18n/i18nForTests'
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
// eslint-disable-next-line fsd-paths-checker-plugin/layer-import-control
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { Theme } from '@/shared/const/theme'
// eslint-disable-next-line fsd-paths-checker-plugin/layer-import-control
import '@/app/styles/index.scss'

export interface componentRenderOptions {
    route?: string
    initialState?: DeepPartial<StateSchema>
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
    theme?: Theme
}

interface TestProvidersProps {
    children?: ReactNode
    options?: componentRenderOptions
}

export const TestsProvider = (props: TestProvidersProps) => {
    const { children, options = {} } = props
    const {
        route = '/',
        initialState,
        asyncReducers,
        theme = Theme.LIGHT,
    } = options

    return (
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider
                asyncReducers={asyncReducers}
                initialState={initialState as StateSchema}
            >
                <I18nextProvider i18n={i18nForTests}>
                    <ThemeProvider initialTheme={theme}>
                        <div className={`app ${theme}`}>{children}</div>
                    </ThemeProvider>
                </I18nextProvider>
            </StoreProvider>
        </MemoryRouter>
    )
}
export const ComponentRender = (
    component: ReactNode,
    options: componentRenderOptions = {},
) => render(<TestsProvider options={options}>{component}</TestsProvider>)
