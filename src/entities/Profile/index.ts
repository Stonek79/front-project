export { fetchProfileData } from './model/sevices/FetchPrifileData'
export { updateProfileData } from './model/sevices/UpdateProfileData'
export { getProfileForm } from './model/selectors/getProfileForm/getProfileForm'
export { getProfileReadonly } from './model/selectors/getProfileReadonly/getProfileReadonly'
export { getProfileIsLoading } from './model/selectors/getProfileIsLoading/getProfileIsLoading'
export { getProfileError } from './model/selectors/getProfileError/getProfileError'
export { getProfileData } from './model/selectors/getProfileData/getProfileData'

export { ProfileCard } from './ui/ProfileCard/ProfileCard'
export {
    Profile, ProfileSchema,
} from './model/types/profile'
export {
    profileActions, profileReducer,
} from './model/slice/profileSlice'
