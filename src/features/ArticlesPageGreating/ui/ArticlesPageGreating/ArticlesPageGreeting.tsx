import { useTranslation } from 'react-i18next'
import { memo, useEffect, useState } from 'react'
import {
    getIsVisited,
    saveJsonSettings,
    useJsonSettings,
} from '@/entities/User'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Modal } from '@/shared/ui/redesigned/Modal'
import { Drawer } from '@/shared/ui/redesigned/Drawer'
import { Text } from '@/shared/ui/redesigned/Text'
import { useResize } from '@/shared/lib/hooks/useResize/useResize'

export const ArticlesPageGreeting = memo(() => {
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const { isArticlesPageOpened } = useJsonSettings()
    const dispatch = useAppDispatch()
    const { isScreenSm } = useResize()

    useEffect(() => {
        if (!isArticlesPageOpened && !getIsVisited) {
            setIsOpen(true)
            dispatch(saveJsonSettings({ isArticlesPageOpened: true }))
            setTimeout(() => setIsOpen(false), 3000)
        }
    }, [dispatch, isArticlesPageOpened])

    const toggleClose = () => setIsOpen(false)

    const greeting = (
        <Text
            title={t('Welcome to the Articles Page')}
            text={t('Here you can read articles for different themes')}
        />
    )

    if (!isScreenSm) {
        return (
            <Drawer lazy isOpen={isOpen} onClose={toggleClose}>
                {greeting}
            </Drawer>
        )
    }

    return (
        <Modal lazy isOpen={isOpen} onClose={toggleClose}>
            {greeting}
        </Modal>
    )
})
