import './styles/index.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTheme } from 'app/providers/ThemeProvider'
import { AppRouter } from 'app/providers/router'
import { Navbar } from 'widgets/Navbar'
import { SidebarLayout } from 'widgets/Sidebar'
import { Suspense } from 'react'
import { Spinner } from 'shared/ui/Spinner/Spinner'

const App = () => {
    const { theme } = useTheme()
    const cn = classNames('app', [theme])

    return (
        <div className={cn}>
            <Suspense fallback={<Spinner />}>
                <Navbar />
                <div className="content-page">
                    <SidebarLayout />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    )
}

export default App
