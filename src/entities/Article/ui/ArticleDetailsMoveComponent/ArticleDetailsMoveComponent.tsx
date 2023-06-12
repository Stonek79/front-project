import { memo, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleDetailsMoveComponent.module.scss'
import { Icon } from '@/shared/ui/redesigned/Icon'
import Arrow from '@/shared/assets/icons/arrow-bottom.svg'

interface ArticleDetailsMoveComponentProps {
    className?: string
    children: ReactNode
    handleMoveUp: () => void
    handleMoveDown: () => void
}

export const ArticleDetailsMoveComponent = memo(
    (props: ArticleDetailsMoveComponentProps) => {
        const { className, children, handleMoveUp, handleMoveDown } = props
        const { t } = useTranslation()

        const cn = classNames(cls.ArticleDetailsMoveComponent, {}, [className])
        const upBtnCn = classNames(cls.btn, {}, [cls.upBtn])
        const downBtnCn = classNames(cls.btn, {}, [cls.downBtn])
        const deleteBtnCn = classNames(cls.btn, {}, [cls.deleteBtn])

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
