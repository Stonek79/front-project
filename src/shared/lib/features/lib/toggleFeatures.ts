import { FeatureFlags } from '@/shared/types/featureFlags'
import { getFeatureFlags } from './setGetFeaturs'

export interface ToggleFeaturesOptions<T> {
    name: keyof FeatureFlags
    on: () => T
    off: () => T
}

export const toggleFeatures = <T>({
    name,
    off,
    on,
}: ToggleFeaturesOptions<T>): T => {
    if (getFeatureFlags(name)) {
        return on()
    }

    return off()
}
