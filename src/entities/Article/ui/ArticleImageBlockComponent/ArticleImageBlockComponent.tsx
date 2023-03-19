import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Text, TextAlign } from 'shared/ui/Text/Text'
import cls from './ArticleImageBlockComponent.module.scss'
import { ArticleImageBlock } from '../../model/types/article'

interface ArticleImageBlockComponentProps {
    className?: string;
    block: ArticleImageBlock
}

export const ArticleImageBlockComponent = memo((props: ArticleImageBlockComponentProps) => {
    const { className, block } = props
    const { t } = useTranslation()

    const cn = classNames('', {}, [className])

    return (
        <div className={cn}>
            <img src={block.src} alt={block.title} className={cls.img} />
            {block.title && (<Text text={block.title} align={TextAlign.CENTER} />)}
        </div>
    )
})
