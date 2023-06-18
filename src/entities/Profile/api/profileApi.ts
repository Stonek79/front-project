import { rtkApi } from '@/shared/api/rtkApi'
import { Profile } from '../model/types/profile'

const profileApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        addProfile: build.mutation<Profile, Profile>({
            query: (newProfile) => ({
                url: `/profile`,
                method: 'POST',
                body: newProfile,
            }),
        }),
    }),
})

export const addProfileMutation = profileApi.endpoints.addProfile.initiate
