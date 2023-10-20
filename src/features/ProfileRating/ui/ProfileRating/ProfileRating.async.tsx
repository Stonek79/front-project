import { lazy, Suspense } from 'react'
import { ProfileRatingProps } from './ProfileRating'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'

const ProfileRatingLazy = lazy(() => import('./ProfileRating'))

export const ProfileRatingAsync = (props: ProfileRatingProps) => (
    <Suspense fallback={<Skeleton width="100%" height={140} />}>
        <ProfileRatingLazy {...props} />
    </Suspense>
)
