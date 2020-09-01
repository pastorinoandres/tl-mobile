import { createAction } from 'redux-actions';
import {
    SET_SHIPPING_TIME, 
    SET_SESSION,
    SET_REGISTER_DATA,
    //nuevas
    LOGIN_REQUEST,
    LOGOUT,
    SET_SYSTEM,
    CLEAN_SCOPE,
    SET_FIREBASE_USER,
    RESTORE_PASSWORD,
    UPDATE_EMAIL,
    CANCEL_REGISTER,
    VERIFY_EMAIL_CHECK,
    VERIFY_EMAIL_RESET,
    CLOCKIN,
    UPLOAD_PHOTO,
    SET_NET_INFO
} from './systemConstants';



//ReducerActions
export const setShippingTime = createAction(SET_SHIPPING_TIME)
export const setSession = createAction(SET_SESSION)
export const setRegisterData = createAction(SET_REGISTER_DATA)
//nuevas
export const setSystem = createAction(SET_SYSTEM)
export const clearData = createAction(CLEAN_SCOPE)

//ReduxActions
export const login = createAction(LOGIN_REQUEST)
export const logout = createAction(LOGOUT)
export const setFirebaseUser = createAction(SET_FIREBASE_USER)
export const restorePassword = createAction(RESTORE_PASSWORD)
export const updateEmail = createAction(UPDATE_EMAIL)



export const cancelRegister = createAction(CANCEL_REGISTER)
export const checkEmail = createAction(VERIFY_EMAIL_CHECK)
export const resetVerifyEmail = createAction(VERIFY_EMAIL_RESET)
export const clockin = createAction(CLOCKIN)
export const uploadPhoto = createAction(UPLOAD_PHOTO)
export const setNetInfo = createAction(SET_NET_INFO)
