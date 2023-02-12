export type AppRoutesType = 'main' | 'about' | 'not_found'

export const AppRoutes = {
    MAIN: 'main',
    ABOUT: 'about',
    NOT_FOUND: 'not_found',
} as const

export const RoutePath: Record<AppRoutesType, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',

    // always in the end of paths
    [AppRoutes.NOT_FOUND]: '*',
}
