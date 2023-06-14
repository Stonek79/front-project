import { memo, ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleDetailsMoveComponent.module.scss'
import { Icon } from '@/shared/ui/redesigned/Icon'
import Arrow from '@/shared/assets/icons/arrow-bottom.svg'
import { Article, ArticleBlock } from '../../model/types/article'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { articleDetailsActions } from '../../model/slice/articleDetailsSlice'

interface ArticleDetailsMoveComponentProps {
    className?: string
    children: ReactNode
    articleData: Article
    block: ArticleBlock
}

export const ArticleDetailsMoveComponent = memo(
    (props: ArticleDetailsMoveComponentProps) => {
        const { className, children, articleData, block } = props
        const dispatch = useAppDispatch()

        const cn = classNames(cls.ArticleDetailsMoveComponent, {}, [className])
        const upBtnCn = classNames(cls.btn, {}, [cls.upBtn])
        const downBtnCn = classNames(cls.btn, {}, [cls.downBtn])
        const deleteBtnCn = classNames(cls.btn, {}, [cls.deleteBtn])

        const { blocks } = articleData

        const handleMoveUp = () => {
            const position = blocks.indexOf(block)
            const tempBlocks = [...blocks]

            if (position === 0) return
            tempBlocks[position] = blocks[position - 1]
            tempBlocks[position - 1] = block

            dispatch(
                articleDetailsActions.updateArticle({
                    ...articleData,
                    blocks: tempBlocks,
                }),
            )
        }
        const handleMoveDown = () => {
            const position = blocks.indexOf(block)
            const tempBlocks = [...blocks]

            if (position === blocks.length - 1) return
            tempBlocks[position] = blocks[position + 1]
            tempBlocks[position + 1] = block

            dispatch(
                articleDetailsActions.updateArticle({
                    ...articleData,
                    blocks: tempBlocks,
                }),
            )
        }

        return (
            <div className={cn}>
                <div className={upBtnCn}>
                    <Icon
                        Svg={Arrow}
                        width={70}
                        height={40}
                        clickable
                        onClick={handleMoveUp}
                    />
                </div>
                {/* eslint-disable-next-line i18next/no-literal-string */}
                <button type="button" className={deleteBtnCn}>
                    ❌
                </button>
                {children}
                <div className={downBtnCn}>
                    <Icon
                        Svg={Arrow}
                        width={70}
                        height={40}
                        clickable
                        onClick={handleMoveDown}
                    />
                </div>
            </div>
        )
    },
)
