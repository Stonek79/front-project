import { ReactNode, useEffect, useState } from 'react'
import { VStack } from '@/shared/ui/redesigned/Stack'
import cls from './TagsLayout.module.scss'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import { Text } from '@/shared/ui/redesigned/Text'
import { useResize } from '@/shared/lib/hooks/useResize/useResize'

interface TagsLayoutProps {
    children?: ReactNode
}

export const TagsLayout = (props: TagsLayoutProps) => {
    const { children } = props
    const [isLoad, setIsLoad] = useState(false)
    const { isScreenSm } = useResize()

    useEffect(() => {
        setTimeout(() => setIsLoad(true), 0)
    }, [])

    const mode: Mods = { [cls.loaded]: isLoad }
    const cnTop = classNames('', {}, [cls.tags, cls['top-tags']])
    const cnBottom = classNames('', {}, [cls.tags, cls['bottom-tags']])
    const cnIndent = classNames('', { [cls.mobile]: !isScreenSm }, [cls.indent])

    return (
        <VStack className={cls.tagsLayout} max>
            <VStack className={cnTop}>
                <Text
                    className={classNames('', mode, [cls['tag-html']])}
                    text="</html>"
                    variant="tag"
                    cursive
                    size="l"
                />
                <Text
                    className={classNames('', mode, [cls['tag-body']])}
                    text="</body>"
                    variant="tag"
                    cursive
                    size="l"
                />
            </VStack>
            <div className={cnIndent}>{children}</div>
            <VStack className={cnBottom}>
                <Text
                    className={classNames('', mode, [cls['tag-body']])}
                    text="</body>"
                    variant="tag"
                    cursive
                    size="l"
                />
                <Text
                    className={classNames('', mode, [cls['tag-html']])}
                    text="</html>"
                    variant="tag"
                    cursive
                    size="l"
                />
            </VStack>
        </VStack>
    )
}
