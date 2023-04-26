import { StateSchema } from '@/app/providers/StoreProvider'

export const getUserInitData = (state: StateSchema) => state.user?.inited
