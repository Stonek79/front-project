import { FC, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { createReduxStore } from 'app/providers/StoreProvider/config/store'
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema'

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: StateSchema
}

export const StoreProvider: FC<StoreProviderProps> = (props) => {
    const { children, initialState } = props

    const store = createReduxStore(initialState as StateSchema)

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
