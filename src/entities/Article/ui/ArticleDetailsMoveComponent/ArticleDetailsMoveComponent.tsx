/* eslint-disable i18next/no-literal-string */
import { memo, ReactNode, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleDetailsMoveComponent.module.scss'
import { Icon } from '@/shared/ui/redesigned/Icon'
import Arrow from '@/shared/assets/icons/arrow-bottom.svg'
import { ArticleBlock } from '../../model/types/article'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { articleDetailsActions } from '../../model/slice/articleDetailsSlice'

interface ArticleDetailsMoveComponentProps {
    className?: string
    children: ReactNode
    blocks: ArticleBlock[]
    block: ArticleBlock
    setIsOpen: (value: boolean) => void
    setData: (data: any) => void
}

export const ArticleDetailsMoveComponent = memo(
    (props: ArticleDetailsMoveComponentProps) => {
        const { className, children, blocks, block, setIsOpen, setData } = props
        const dispatch = useAppDispatch()

        const cn = classNames(cls.ArticleDetailsMoveComponent, {}, [className])
        const upBtnCn = classNames(cls.btn, {}, [cls.upBtn])
        const downBtnCn = classNames(cls.btn, {}, [cls.downBtn])
        const deleteBtnCn = classNames(cls.btn, {}, [cls.deleteBtn])

        const onOpenModal = useCallback(() => {
            setIsOpen(true)
            setData(block)
        }, [block, setData, setIsOpen])

        const handleMoveUp = () => {
            const position = blocks.indexOf(block)
            const tempBlocks = [...blocks]

            if (position === 0) return
            tempBlocks[position] = blocks[position - 1]
            tempBlocks[position - 1] = block

            dispatch(articleDetailsActions.updateArticleBlocks(tempBlocks))
        }

        const handleMoveDown = () => {
            const position = blocks.indexOf(block)
            const tempBlocks = [...blocks]

            if (position === blocks.length - 1) return
            tempBlocks[position] = blocks[position + 1]
            tempBlocks[position + 1] = block

            dispatch(articleDetailsActions.updateArticleBlocks(tempBlocks))
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
                <button
                    type="button"
                    onClick={onOpenModal}
                    className={deleteBtnCn}
                >
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
