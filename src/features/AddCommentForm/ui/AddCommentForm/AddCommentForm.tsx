import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input'
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button'
import { Input } from '@/shared/ui/redesigned/Input'
import { Button } from '@/shared/ui/redesigned/Button'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {
    commentFormActions,
    commentFormReducer,
} from '../../model/slices/addCommentFormSlice'
import cls from './AddCommentForm.module.scss'
import {
    // getCommentFormError,
    // getCommentFormIsLoading,
    getCommentFormText,
} from '../../model/selectors/addCommentFormSelectors'
import { ToggleComponentFeatures } from '@/shared/lib/features'
import { Card } from '@/shared/ui/redesigned/Card'

export interface AddCommentFormProps {
    className?: string
    onSendComment: (text: string) => void
}

const reducer: ReducersList = {
    commentForm: commentFormReducer,
}

const AddCommentForm = memo((props: AddCommentFormProps) => {
    const { className, onSendComment } = props
    const { t } = useTranslation()
    const text = useSelector(getCommentFormText)
    // const error = useSelector(getCommentFormError)
    // const isLoading = useSelector(getCommentFormIsLoading)
    const dispatch = useAppDispatch()

    const onCommentChange = useCallback(
        (value: string) => {
            dispatch(commentFormActions.setText(value))
        },
        [dispatch],
    )

    const onSendHandler = useCallback(() => {
        onSendComment(text || '')
        onCommentChange('')
    }, [onCommentChange, onSendComment, text])

    const cn = classNames(cls.AddCommentForm, {}, [className])

    return (
        <DynamicModuleLoader reducers={reducer} removeAfterUnmount>
            <ToggleComponentFeatures
                feature="isAppRedesigned"
                on={
                    <Card cardPaddings="24" cardBorder="rounded" max>
                        <HStack
                            data-testid="AddCommentForm"
                            max
                            gap="8"
                            justify="between"
                            className={className}
                        >
                            <Input
                                data-testid="AddCommentForm.Input"
                                className={cls.inputComment}
                                placeholder={t('Enter comment text')}
                                value={text}
                                onChange={onCommentChange}
                            />

                            <Button
                                data-testid="AddCommentForm.Send"
                                onClick={onSendHandler}
                            >
                                {t('Send')}
                            </Button>
                        </HStack>
                    </Card>
                }
                off={
                    <HStack
                        data-testid="AddCommentForm"
                        max
                        gap="8"
                        justify="between"
                        className={cn}
                    >
                        <InputDeprecated
                            data-testid="AddCommentForm.Input"
                            className={cls.inputComment}
                            placeholder={t('Enter comment text')}
                            value={text}
                            onChange={onCommentChange}
                        />

                        <ButtonDeprecated
                            data-testid="AddCommentForm.Send"
                            onClick={onSendHandler}
                        >
                            {t('Send')}
                        </ButtonDeprecated>
                    </HStack>
                }
            />
        </DynamicModuleLoader>
    )
})

export default AddCommentForm
