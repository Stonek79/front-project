/* eslint-disable i18next/no-literal-string */
import { ReactNode, useEffect, useState } from 'react'
import { VStack } from '@/shared/ui/redesigned/Stack'
import cls from './TagsLayout.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'

interface TagsLayoutProps {
    children?: ReactNode
}

export const TagsLayout = (props: TagsLayoutProps) => {
    const { children } = props
    const [isLoad, setIsLoad] = useState(false)

    useEffect(() => {
        setTimeout(() => setIsLoad(true), 0)
    }, [])

    const cnTop = classNames('', {}, [cls.tags, cls['top-tags']])
    const cnBottom = classNames('', {}, [cls.tags, cls['bottom-tags']])

    return (
        <VStack className={cls.tagsLayout} max>
            <span className={cnTop}>
                <span
                    className={cls['tag-html']}
                    style={{ transform: isLoad ? 'translateX(0%)' : '' }}
                >
                    &lt;/html&gt;
                </span>
                <span
                    className={cls['tag-body']}
                    style={{ transform: isLoad ? 'translateX(0%)' : '' }}
                >
                    &lt;/body&gt;
                </span>
            </span>
            {children}
            <span className={cnBottom}>
                <span
                    className={cls['tag-body']}
                    style={{ transform: isLoad ? 'translateX(0%)' : '' }}
                >
                    &lt;/body&gt;
                </span>
                <span
                    className={cls['tag-html']}
                    style={{ transform: isLoad ? 'translateX(0%)' : '' }}
                >
                    &lt;/html&gt;
                </span>
            </span>
        </VStack>
    )
}
