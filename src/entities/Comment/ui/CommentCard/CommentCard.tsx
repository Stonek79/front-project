import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Text } from 'shared/ui/Text/Text'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'
import { Comment } from '../../model/types/comment'
import cls from './CommentCard.module.scss'

interface CommentCardProps {
    className?: string;
    comment?: Comment
    isLoading?: boolean
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading } = props
    const { t } = useTranslation()

    const cn = classNames(cls.CommentCard, {}, [className])

    if (isLoading) {
        return (
            <div className={cn}>
                <div className={cls.header}>
                    <Skeleton height={30} width={30} border="50%" />
                    <Skeleton className={cls.username} height={20} width={90} />
                </div>
                <Skeleton className={cls.text} height={60} width="100%" />
            </div>
        )
    }

    return (
        <div className={cn}>
            <div className={cls.header}>
                {comment?.user.avatar && <Avatar size={30} alt={comment?.user.username} src={comment?.user.avatar} />}
                <Text className={cls.username} title={comment?.user.username} />
            </div>
            <Text className={cls.text} text={comment?.text} />
        </div>
    )
})
