import { memo } from 'react'
import { MainLayout } from '../MainLayout/MainLayout'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton/Skeleton'
import { Card } from '@/shared/ui/redesigned/Card'

export const AppLoaderLayout = memo(() => (
    <MainLayout
        header={
            <Card cardPaddings="16">
                <HStack>
                    <Skeleton width={40} height={40} border="50%" />
                </HStack>
            </Card>
        }
        content={
            <VStack gap="16" style={{ height: '100%' }}>
                <Skeleton width="70%" height={32} border="16px" />
                <Skeleton width="40%" height={20} border="16px" />
                <Skeleton width="50%" height={20} border="16px" />
                <Skeleton width="30%" height={32} border="16px" />
                <Skeleton width="80%" height="40%" border="16px" />
                <Skeleton width="80%" height="40%" border="16px" />
            </VStack>
        }
        sidebar={<Skeleton border="32px" width={220} height="100%" />}
    />
))
