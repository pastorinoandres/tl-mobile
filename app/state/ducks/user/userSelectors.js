import { createSelector } from 'reselect';
import { getSession, getRegisterData } from './../system/systemSelectors'
import { EmailAuthProvider, FacebookAuthProvider, GoogleAuthProvider } from './../../../services/firebase';
import { toJsDate } from '../../../services/convertDates'

export const getProfile = (state) => {

    if(state.user?.profile.birth){

        const birth = toJsDate(state.user.profile.birth)

        return {...state.user.profile, birth}
        

    }else{

        return state.user?.profile

    }
}

export const getAuthorization = (state) => !!(state.user?.permissions?.length)    
export const getLastProvider = (state) => null //FIXME  
export const getAuthData = (state) => state.user?.authData //FIXME




function generateCredential(providerId,registerData,session){

    switch(providerId){
        case 'password':
            return (registerData)?EmailAuthProvider.credential(registerData.email,registerData.password):null
        case 'facebook.com':
            return FacebookAuthProvider.credential(session.provider.credential.token); 
        case 'google.com':
            return GoogleAuthProvider.credential(session.provider.credential.idToken);
    }

}

export const getCredential = createSelector(getLastProvider, getRegisterData, getSession, generateCredential ) //FIXME


export const exist = (state)=> !!state.user

//isAuthenticated: Retorna true si el usuario tiene una session valida y los permisos para acceder a la app.
export const getIsAuthenticated = createSelector(getSession, getAuthorization, (session,authorization) => !!(session && authorization))



export const getUser = (state) => state.user
