import 'app/styles/index.scss'
import { Story } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import { Spinner } from 'shared/ui/Spinner/Spinner'

export const RouterDecorator = (story: () => Story) => (
    <BrowserRouter>
        <Suspense fallback={<Spinner />}>
            {story()}
        </Suspense>
    </BrowserRouter>
)
