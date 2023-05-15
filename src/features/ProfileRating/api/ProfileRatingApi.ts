import { rtkApi } from '@/shared/api/rtkApi'
import { Rating } from '@/entities/Rating'

interface GetProfileRatingArgs {
    userId: string
}

interface RateProfileArgs {
    userId: string
    starRate: number
    feedback?: string
}

const articleRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getProfileRating: build.query<Rating[], GetProfileRatingArgs>({
            query: ({ userId }) => ({
                url: '/profile-ratings',
                params: {
                    userId,
                },
            }),
        }),
        rateProfile: build.mutation<void, RateProfileArgs>({
            query: (args) => ({
                url: '/profile-ratings',
                method: 'POST',
                body: args,
            }),
        }),
    }),
})

export const useProfileRating = articleRatingApi.useGetProfileRatingQuery
export const useRateProfile = articleRatingApi.useRateProfileMutation
