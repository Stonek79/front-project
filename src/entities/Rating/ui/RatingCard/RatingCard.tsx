import { memo } from 'react'
import { ToggleComponentFeatures } from '@/shared/lib/features'
import { RatingCardRedesigned } from '../RatingCardRedesigned/RatingCardRedesigned'
import { RatingCardDeprecated } from '../RatingCardDeprecated/RatingCardDeprecated'

export interface RatingCardProps {
    className?: string
    title?: string
    feedbackTitle?: string
    hasFeedback?: boolean
    onCancel?: (starsCount: number) => void
    onAccept?: (starsCount: number, feedback?: string) => void
    starRate?: number
}

export const RatingCard = memo((props: RatingCardProps) => (
    <ToggleComponentFeatures
        feature="isAppRedesigned"
        on={<RatingCardRedesigned {...props} />}
        off={<RatingCardDeprecated {...props} />}
    />
))
