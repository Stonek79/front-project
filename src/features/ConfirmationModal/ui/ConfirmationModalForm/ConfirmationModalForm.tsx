import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ConfirmationModalForm.module.scss'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Text } from '@/shared/ui/redesigned/Text'
import { Button } from '@/shared/ui/redesigned/Button'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { articleDetailsReducer } from '@/entities/Article'

export interface ConfirmationModalFormProps {
    className?: string
    onCancel: () => void
    header?: string
    onConfirm: () => void
}

const initialReducers: ReducersList = {
    article: articleDetailsReducer,
}

const ConfirmationModalForm = memo((props: ConfirmationModalFormProps) => {
    const { className, header = '', onCancel, onConfirm } = props
    const { t } = useTranslation()

    const cn = classNames(cls.ConfirmationModalForm, {}, [className])

    return (
        <DynamicModuleLoader
            reducers={initialReducers}
            removeAfterUnmount={Boolean(false)}
        >
            <VStack className={cn} align="center" gap="16">
                <Text title={header} />
                <HStack justify="between" gap="16" max>
                    <Button
                        size="l"
                        variant="filled"
                        color="error"
                        onClick={onCancel}
                    >
                        {t('No')}
                    </Button>
                    <Button
                        size="l"
                        variant="outline"
                        color="success"
                        onClick={onConfirm}
                    >
                        {t('Yes')}
                    </Button>
                </HStack>
            </VStack>
        </DynamicModuleLoader>
    )
})

export default ConfirmationModalForm
