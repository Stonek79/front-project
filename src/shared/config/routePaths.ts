export type AppRoutesType = 'main' | 'about'

export const AppRoutes = {
    MAIN: 'main',
    ABOUT: 'about',
} as const

export const RoutePath: Record<AppRoutesType, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
}
