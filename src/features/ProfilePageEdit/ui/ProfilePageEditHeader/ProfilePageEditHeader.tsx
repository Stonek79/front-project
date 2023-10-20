import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { HStack } from '@/shared/ui/redesigned/Stack'

import { Text } from '@/shared/ui/redesigned/Text'
import { Button } from '@/shared/ui/redesigned/Button'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { classNames } from '@/shared/lib/classNames/classNames'
import { getUserAuthData } from '@/entities/User'
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly'
import { profileActions } from '../../model/slice/profileSlice'
import { updateProfileData } from '../../model/services/UpdateProfileData'
import { Card } from '@/shared/ui/redesigned/Card'
import { Profile } from '@/entities/Profile'
import { useResize } from '@/shared/lib/hooks/useResize/useResize'

interface ProfilePageEditHeaderProps {
    className?: string
    data?: Profile
}

export const ProfilePageEditHeader = memo(
    (props: ProfilePageEditHeaderProps) => {
        const { data, className } = props

        const { t } = useTranslation()
        const dispatch = useAppDispatch()
        const authData = useSelector(getUserAuthData)
        const readonly = useSelector(getProfileReadonly)
        const { isScreenMd } = useResize()

        const profileData = data
        const cn = classNames('', {}, [className])
        const canEdit = authData?.id === profileData?.userId

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
            <Card cardPaddings="16" cardBorder="standard" max>
                <HStack justify="between" max className={cn}>
                    <Text title={t('Profile')} />
                    {canEdit &&
                        (readonly ? (
                            <Button
                                size={isScreenMd ? 'm' : 's'}
                                variant="outline"
                                onClick={onEdit}
                                data-testid="ProfilePageEditHeader-edit"
                            >
                                {t('Edit profile')}
                            </Button>
                        ) : (
                            <HStack gap="8">
                                <Button
                                    size={isScreenMd ? 'm' : 's'}
                                    variant="outline"
                                    color="error"
                                    onClick={onCancelEdit}
                                    data-testid="ProfilePageEditHeader-cancel-edit"
                                >
                                    {t('Cancel edit')}
                                </Button>
                                <Button
                                    size={isScreenMd ? 'm' : 's'}
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
        )
    },
)
