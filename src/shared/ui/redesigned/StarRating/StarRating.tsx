import { memo, useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './StarRating.module.scss'
import StarIcon from '../../../assets/icons/star.svg'
import { Icon } from '../Icon'

interface StarRatingProps {
    className?: string
    onSelect?: (starsCount: number) => void
    size?: number
    selectedStars?: number
}

const stars = [1, 2, 3, 4, 5]

export const StarRating = memo((props: StarRatingProps) => {
    const { className, onSelect, size = 30, selectedStars = 0 } = props
    const [hoveredStar, setHoveredStar] = useState(selectedStars)
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars))

    const onHover = (star: number) => () => {
        if (!isSelected) {
            setHoveredStar(star)
        }
    }

    const onLeave = () => {
        if (!isSelected) {
            setHoveredStar(0)
        }
    }

    const onSelectStar = (star: number) => () => {
        if (!isSelected) {
            setHoveredStar(star)
            setIsSelected(true)
            onSelect?.(star)
        }
    }

    const cn = classNames(cls.StarRatingRedesigned, {}, [className])

    return (
        <div className={cn}>
            {stars.map((star) => (
                <Icon
                    width={size}
                    height={size}
                    className={classNames(
                        cls.normal,
                        {
                            [cls.starIcon]: !isSelected,
                            [cls.hovered]: Boolean(hoveredStar >= star),
                        },
                        [],
                    )}
                    Svg={StarIcon}
                    key={star}
                    onMouseLeave={onLeave}
                    onMouseEnter={onHover(star)}
                    onClick={onSelectStar(star)}
                    data-testid={`StarRating.${star}`}
                    data-selected={hoveredStar >= star}
                    clickable
                />
            ))}
        </div>
    )
})
