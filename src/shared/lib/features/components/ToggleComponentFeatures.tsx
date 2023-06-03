import { ReactElement } from 'react'
import { FeatureFlags } from '@/shared/types/featureFlags'
import { getFeatureFlags } from '../lib/setGetFeaturs'

export interface ToggleComponentFeaturesProps {
    feature: keyof FeatureFlags
    on: ReactElement
    off: ReactElement
}

export const ToggleComponentFeatures = ({
    feature,
    off,
    on,
}: ToggleComponentFeaturesProps) => {
    if (getFeatureFlags(feature)) {
        return on
    }

    return off
}
