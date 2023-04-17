import { StateSchema } from 'app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';
import { UserRoles } from '../types/user';

export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;
export const isUserAdmin = createSelector(getUserRoles, (roles) => Boolean(roles?.includes(UserRoles.ADMIN)));
export const isUserManager = createSelector(getUserRoles, (roles) => Boolean(roles?.includes(UserRoles.MANAGER)));
