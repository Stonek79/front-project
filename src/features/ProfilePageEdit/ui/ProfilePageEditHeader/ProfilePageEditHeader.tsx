import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { Text } from '@/shared/ui/deprecated/Text'
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { classNames } from '@/shared/lib/classNames/classNames'
import { getUserAuthData } from '@/entities/User'
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly'
import { profileActions } from '../../model/slice/profileSlice'
import { updateProfileData } from '../../model/services/UpdateProfileData'
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData'

interface ProfilePageEditHeaderProps {
    className?: string
}

export const ProfilePageEditHeader = memo(
    (props: ProfilePageEditHeaderProps) => {
        const { className } = props
        const { t } = useTranslation()
        const dispatch = useAppDispatch()
        const authData = useSelector(getUserAuthData)
        const profileData = useSelector(getProfileData)
        const canEdit = authData?.id === profileData?.id
        const readonly = useSelector(getProfileReadonly)
        const cn = classNames('', {}, [className])

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
            <HStack justify="between" max className={cn}>
                <Text title={t('Profile')} />
                {canEdit &&
                    (readonly ? (
                        <Button
                            theme={ButtonTheme.OUTLINE}
                            onClick={onEdit}
                            data-testid="ProfilePageEditHeader-edit"
                        >
                            {t('Edit profile')}
                        </Button>
                    ) : (
                        <HStack gap="8">
                            <Button
                                theme={ButtonTheme.OUTLINE_RED}
                                onClick={onCancelEdit}
                                data-testid="ProfilePageEditHeader-cancel-edit"
                            >
                                {t('Cancel edit')}
                            </Button>
                            <Button
                                theme={ButtonTheme.OUTLINE}
                                onClick={onSave}
                                data-testid="ProfilePageEditHeader-save"
                            >
                                {t('Save')}
                            </Button>
                        </HStack>
                    ))}
            </HStack>
        )
    },
)
