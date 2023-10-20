import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ProfileRating.module.scss'
import { RatingCard } from '@/entities/Rating'
import { useProfileRating, useRateProfile } from '../../api/ProfileRatingApi'
import { getUserAuthData } from '@/entities/User'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'

export interface ProfileRatingProps {
    className?: string
    userId?: string
}

const ProfileRating = memo((props: ProfileRatingProps) => {
    const { className, userId = '' } = props
    const { t } = useTranslation()
    const userData = useSelector(getUserAuthData)
    const { data, isLoading } = useProfileRating({
        userId,
    })

    const [rateProfileMutation] = useRateProfile()

    const handleRateProfile = useCallback(
        (rate: number, feedback?: string) => {
            try {
                rateProfileMutation({
                    userId: userData?.id ?? '',
                    feedback,
                    starRate: rate,
                })
            } catch (e) {
                console.log(e)
            }
        },
        [rateProfileMutation, userData?.id],
    )

    const onAccept = useCallback(
        (starsCount: number, feedback?: string) => {
            handleRateProfile(starsCount, feedback)
        },
        [handleRateProfile],
    )

    const onCancel = useCallback(
        (starsCount: number) => {
            handleRateProfile(starsCount)
        },
        [handleRateProfile],
    )

    if (isLoading) {
        return <Skeleton width="100%" height={140} />
    }

    const cn = classNames(cls.ProfileRating, {}, [className])

    const rating = data?.[0]?.starRate ?? 0
    return (
        <RatingCard
            onAccept={onAccept}
            onCancel={onCancel}
            className={cn}
            title={t('Rate User profile')}
            feedbackTitle={t('We will glad to get your vote')}
            hasFeedback
            starRate={rating}
        />
    )
})

export default ProfileRating
