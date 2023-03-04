import { FC, useEffect } from 'react'
import { useDispatch, useStore } from 'react-redux'
import { ReduxStoreWithManager, StateSchemaKeys } from 'app/providers/StoreProvider'
import { Reducer } from '@reduxjs/toolkit'

export type ReducersList = {
    [name in StateSchemaKeys]?: Reducer
}

interface DynamicModuleLoaderProps {
    reducers: ReducersList
    removeAfterUnmount?: boolean
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
    const {
        children, reducers, removeAfterUnmount = true,
    } = props

    const store = useStore() as ReduxStoreWithManager
    const dispatch = useDispatch()
    useEffect(() => {
        Object.entries(reducers).forEach(([name, reducer]: [StateSchemaKeys, Reducer]) => {
            store.reducerManager.add(name, reducer)
            dispatch({ type: `@INIT ${name} reducer` })
        })

        return () => {
            if (removeAfterUnmount) {
                Object.keys(reducers).forEach((name: StateSchemaKeys) => {
                    store.reducerManager.remove('loginForm')
                    dispatch({ type: `@DESTROY ${name} reducer` })
                })
            }
        }
        // eslint-disable-next-line
    }, [])

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            { children }
        </>
    );
};
