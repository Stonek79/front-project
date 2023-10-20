import { memo } from 'react'
import { RatingCardRedesigned } from '../RatingCardRedesigned/RatingCardRedesigned'

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
    <RatingCardRedesigned {...props} />
))
