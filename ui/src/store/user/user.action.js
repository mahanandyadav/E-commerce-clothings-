import { USER_ACTION_TYPES } from './user.types';
import { createAction } from '../../utils/reducer/reducer.utils';

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const checkUserSession = () => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)

export const googleSignInStart = () => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START)
//actin tipe will triger saga entry
export const emailSignInStart = (email, password) => createAction(
  USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
  { email, password }
)

export const signInSuccess = (payload) => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, payload)
export const signInFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error)

export const signUpStart = (email, password, displayName) => createAction(
  USER_ACTION_TYPES.SIGN_UP_START,
  { email, password, displayName }
)
export const signUpSuccess = ({ user, additionalDetails }) => createAction(
  USER_ACTION_TYPES.SIGN_UP_SUCCESS,
  { user, additionalDetails }
)
export const signUpFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error)

export const signOutStart = () => createAction(USER_ACTION_TYPES.SIGN_OUT_START)
export const signOutFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error)
export const signOutSuccess = () => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCSESS)