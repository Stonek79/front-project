import { memo } from 'react'
import { Avatar } from '@/shared/ui/deprecated/Avatar'
import { Text } from '@/shared/ui/deprecated/Text'
import { Skeleton } from '@/shared/ui/deprecated/Skeleton'
import { AppLink } from '@/shared/ui/deprecated/AppLink'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Comment } from '../../model/types/comment'
import cls from './CommentCard.module.scss'
import { getRouteProfile } from '@/shared/const/router'

interface CommentCardProps {
    className?: string
    comment?: Comment
    isLoading?: boolean
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading } = props

    const cn = classNames(cls.CommentCard, { [cls.loading]: isLoading }, [
        className,
    ])

    if (isLoading || !comment) {
        return (
            <VStack max className={cn}>
                <HStack>
                    <Skeleton height={30} width={30} border="50%" />
                    <Skeleton height={20} width={90} />
                </HStack>
                <Skeleton height={60} width="100%" />
            </VStack>
        )
    }

    return (
        <VStack data-testid="CommentCard.Content" gap="8" max className={cn}>
            <AppLink to={getRouteProfile(comment.user.id)}>
                <HStack gap="8">
                    {comment.user.avatar && (
                        <Avatar
                            size={30}
                            alt={comment.user.username}
                            src={comment?.user.avatar}
                        />
                    )}
                    <Text title={comment.user.username} />
                </HStack>
            </AppLink>
            <Text text={comment.text} />
        </VStack>
    )
})
