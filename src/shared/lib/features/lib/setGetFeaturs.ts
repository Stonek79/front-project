import { FeatureFlags } from '@/shared/types/featureFlags'
import { LOCAL_STORAGE_CURRENT_DESIGN_KEY } from '@/shared/const/localstarage'

let featureFlags: FeatureFlags = {
    isAppRedesigned:
        localStorage.getItem(LOCAL_STORAGE_CURRENT_DESIGN_KEY) === 'new',
}

export const setFeatureFlags = (newFeatureFlags?: FeatureFlags) => {
    if (newFeatureFlags) {
        featureFlags = newFeatureFlags
    }
}

export const getFeatureFlags = (flag: keyof FeatureFlags) =>
    featureFlags?.[flag]

export const getAllFeatureFlags = () => featureFlags
