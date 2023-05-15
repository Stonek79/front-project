import { screen } from '@testing-library/react'
import { ComponentRender } from '@/shared/lib/tests/componentRender/ComponentRender'
import {
    getRouteAbout,
    getRouteAdminPanel,
    getRouteProfile,
} from '@/shared/const/router'
import { AppRouter } from './AppRouter'
import { UserRoles } from '@/entities/User'

describe('Router tests', () => {
    test('Page must to be rendered', async () => {
        ComponentRender(<AppRouter />, {
            route: getRouteAbout(),
        })

        const page = await screen.findByTestId('AboutPage')
        expect(page).toBeInTheDocument()
    })

    test('Page not found', async () => {
        ComponentRender(<AppRouter />, {
            route: '/abracadabra',
        })

        const page = await screen.findByTestId('NotFoundPage')
        expect(page).toBeInTheDocument()
    })

    test('Redirect unauthorized user to main page', async () => {
        ComponentRender(<AppRouter />, {
            route: getRouteProfile('1'),
        })

        const page = await screen.findByTestId('MainPage')
        expect(page).toBeInTheDocument()
    })

    test('Access authorized user to profile page', async () => {
        ComponentRender(<AppRouter />, {
            route: getRouteProfile('1'),
            initialState: {
                user: { inited: true, authData: {} },
            },
        })

        const page = await screen.findByTestId('ProfilePage')
        expect(page).toBeInTheDocument()
    })

    test('Access not allowed', async () => {
        ComponentRender(<AppRouter />, {
            route: getRouteAdminPanel(),
            initialState: {
                user: { inited: true, authData: {} },
            },
        })

        const page = await screen.findByTestId('ForbiddenPage')
        expect(page).toBeInTheDocument()
    })

    test('Access allowed', async () => {
        ComponentRender(<AppRouter />, {
            route: getRouteAdminPanel(),
            initialState: {
                user: { inited: true, authData: { roles: [UserRoles.ADMIN] } },
            },
        })

        const page = await screen.findByTestId('AdminPanelPage')
        expect(page).toBeInTheDocument()
    })
})
