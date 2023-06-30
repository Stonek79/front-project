import cls from './AnimatedLetters.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'

interface AnimatedLettersProps {
    letterClass: string
    strArray: string[]
    index: number
}
export const AnimatedLetters = ({
    letterClass,
    strArray,
    index,
}: AnimatedLettersProps) => (
    <>
        {strArray.map((char, i) => {
            const cn = classNames(cls[letterClass], {}, [cls[`_${i + index}`]])
            return (
                <span key={char + i} className={cn}>
                    {char}
                </span>
            )
        })}
    </>
)
