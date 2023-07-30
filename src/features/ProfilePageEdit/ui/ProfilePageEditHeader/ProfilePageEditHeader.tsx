import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text'
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button'
import { Text } from '@/shared/ui/redesigned/Text'
import { Button } from '@/shared/ui/redesigned/Button'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { classNames } from '@/shared/lib/classNames/classNames'
import { getUserAuthData } from '@/entities/User'
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly'
import { profileActions } from '../../model/slice/profileSlice'
import { updateProfileData } from '../../model/services/UpdateProfileData'
import { ToggleComponentFeatures } from '@/shared/lib/features'
import { Card } from '@/shared/ui/redesigned/Card'
import { Profile } from '@/entities/Profile'

interface ProfilePageEditHeaderProps {
    className?: string
    data?: Profile
}

export const ProfilePageEditHeader = memo(
    (props: ProfilePageEditHeaderProps) => {
        const { data } = props
        const { className } = props
        const { t } = useTranslation()
        const dispatch = useAppDispatch()
        const authData = useSelector(getUserAuthData)
        const profileData = data
        const readonly = useSelector(getProfileReadonly)
        const cn = classNames('', {}, [className])
        const canEdit = authData?.id === profileData?.userId

        console.log(canEdit, authData, profileData, 'ProfilePageEditHeader')

        const onEdit = useCallback(() => {
            dispatch(profileActions.setReadonly(false))
        }, [dispatch])

        const onCancelEdit = useCallback(() => {
            dispatch(profileActions.cancelEdit())
        }, [dispatch])

        const onSave = useCallback(() => {
            dispatch(updateProfileData())
        }, [dispatch])

        return (
            <ToggleComponentFeatures
                feature="isAppRedesigned"
                on={
                    <Card cardPaddings="16" cardBorder="standard" max>
                        <HStack justify="between" max className={cn}>
                            <Text title={t('Profile')} />
                            {canEdit &&
                                (readonly ? (
                                    <Button
                                        variant="outline"
                                        onClick={onEdit}
                                        data-testid="ProfilePageEditHeader-edit"
                                    >
                                        {t('Edit profile')}
                                    </Button>
                                ) : (
                                    <HStack gap="8">
                                        <Button
                                            variant="outline"
                                            color="error"
                                            onClick={onCancelEdit}
                                            data-testid="ProfilePageEditHeader-cancel-edit"
                                        >
                                            {t('Cancel edit')}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            color="success"
                                            onClick={onSave}
                                            data-testid="ProfilePageEditHeader-save"
                                        >
                                            {t('Save')}
                                        </Button>
                                    </HStack>
                                ))}
                        </HStack>
                    </Card>
                }
                off={
                    <HStack justify="between" max className={cn}>
                        <TextDeprecated title={t('Profile')} />
                        {canEdit &&
                            (readonly ? (
                                <ButtonDeprecated
                                    theme={ButtonTheme.OUTLINE}
                                    onClick={onEdit}
                                    data-testid="ProfilePageEditHeader-edit"
                                >
                                    {t('Edit profile')}
                                </ButtonDeprecated>
                            ) : (
                                <HStack gap="8">
                                    <ButtonDeprecated
                                        theme={ButtonTheme.OUTLINE_RED}
                                        onClick={onCancelEdit}
                                        data-testid="ProfilePageEditHeader-cancel-edit"
                                    >
                                        {t('Cancel edit')}
                                    </ButtonDeprecated>
                                    <ButtonDeprecated
                                        theme={ButtonTheme.OUTLINE}
                                        onClick={onSave}
                                        data-testid="ProfilePageEditHeader-save"
                                    >
                                        {t('Save')}
                                    </ButtonDeprecated>
                                </HStack>
                            ))}
                    </HStack>
                }
            />
        )
    },
)
