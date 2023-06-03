import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleAdditionInfo.module.scss'
import { User } from '@/entities/User'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Avatar } from '@/shared/ui/redesigned/Avatar'
import { Text } from '@/shared/ui/redesigned/Text'
import { Button } from '@/shared/ui/redesigned/Button'

interface ArticleAdditionInfoProps {
    className?: string
    author: User
    createdAt: string
    views: number
    onEdit: () => void
}

export const ArticleAdditionInfo = memo((props: ArticleAdditionInfoProps) => {
    const { className, author, views, createdAt, onEdit } = props
    const { t } = useTranslation()

    const cn = classNames(cls.ArticleAdditionInfo, {}, [className])

    return (
        <VStack gap="32" className={cn}>
            <HStack gap="8">
                <Avatar src={author.avatar} size={32} />
                <Text text={author.username} bold />
                <Text text={createdAt} />
            </HStack>
            <Button onClick={onEdit}>{t('Edit article')}</Button>
            <Text text={t('{{count}} views', { count: views })} />
        </VStack>
    )
})
