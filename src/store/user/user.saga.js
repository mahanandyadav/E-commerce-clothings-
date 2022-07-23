import { takeLatest, all, call, put } from 'redux-saga/effects'
import { USER_ACTION_TYPES } from './user.types';

import {
    signInFailed,
    signInSuccess,
    signOutFailed,
    signOutSuccess,
    signUpFailed,
    signUpSuccess
} from './user.action';
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth, signOutUser,
    getCurrentUser,
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup,
    signInWithGoogleRedirect
} from '../../utils/firebase/firebase.utils';

export function* getSnapShotFromUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(
            createUserDocumentFromAuth,
            userAuth,
            additionalDetails
        )
        // console.log(userSnapshot)
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
    } catch (e) {
        yield put(signInFailed(e))
    }
}
export function* signUp({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield call(
            createAuthUserWithEmailAndPassword,
            email,
            password)
        yield put(signUpSuccess(user, { displayName }))
    } catch (e) {
        yield put(signUpFailed, e);
    }
}

export function* singOut() {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess());
    } catch (e) {
        yield call(signOutFailed(e));
    }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
    yield call(getSnapShotFromUserAuth, user, additionalDetails)
}
export function* signInWithGoogle() {
    try {
        // const { user } = yield call(signInWithGoogleRedirect)
        const { user } = yield call(signInWithGooglePopup)
        yield call(getSnapShotFromUserAuth, user)
    } catch (e) {
        yield put(signInFailed(e))
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield call(
            signInAuthUserWithEmailAndPassword,
            email,
            password
        );
        console.log(user);
        yield call(getSnapShotFromUserAuth, user);
    } catch (e) {

        yield put(signInFailed({'error':e,"message":"signInWithEmail fialed"}));
    }
}
export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser)
        if (!userAuth) return;
        yield call(getSnapShotFromUserAuth, userAuth)
    } catch (e) {
        yield put(signInFailed(e))
    }
}
//saga will listen for activity type, launch activity corospondingly
export function* onGoogleSignIn() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}
export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onEmailSignInStart() {
    //go to singInWithEmail
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}
export function* onSignUpStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}
export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onSingOutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, singOut)
}
//listening for sagas
export function* userSagas() {
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignIn),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSingOutStart)
    ]);
}
