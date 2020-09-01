
//dependecies
import { call, put } from 'redux-saga/effects';
import * as Google from 'expo-google-app-auth';

//utils
import google from '../../utils/google'

//sagas
import initializeSystem from './initializeSystem';
import fetchUser from './fetchUser';
import postUser from './postUser';
import { createCredential, signInWithCredential } from './authMethods';

//actions
import { setScreenState } from '../ducks/screens/screensActions';

//constants
import { LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_CANCELLED } from '../ducks/system/systemConstants';
import { AUTH } from './../../navigation/constants';




export default function* loginWithGoogle(){

    const setLoading = (value)=>{
        return setScreenState(AUTH, state => ({loadings:{...state.loadings, ['google']:value }}))
    } 

    try{
        
        const { settings } = google

        //Paso 1: Muestro indicador de carga
        yield put(setLoading(true))


        //Paso 2: Solicito entre otras cosas, el token a Google, especificando la configuración necesaria. 
        const { type, idToken, refreshToken, accessToken } = yield call([Google, Google.logInAsync], settings )


        //LOGIN_CANCELLED: Si el usuario cierra el modal, se cancela toda la operación.
        if (type === 'cancel') { yield put({type:LOGIN_CANCELLED}) }


        //Paso 3: A partir del token, genero la credencial con un método provisto por Firebase.
        const credentials = yield call(createCredential, 'google', idToken)


        //Paso 4: Armo un objeto que contenga la información útil de Google
        const response_google = { idToken, refreshToken, accessToken }


        //Paso 5: Uso la credencial para iniciar session. Esta request retorna información útil de Firebase Auth.   
        const response_firebase = yield call(signInWithCredential, credentials)


        //Paso 6: Normalizó la información conseguida, bajo el modelo de System y la seteo en Redux
        yield call(initializeSystem, 'google', response_firebase, response_google)
         

        //Paso 7: Descargamos los datos del usuario. Si no existen, añadimos un nuevo registro a la base de datos de Firestore.
        let userData = yield call(fetchUser)        
        if(!userData){ userData = yield call(postUser) }


        //Paso 8: Finalizo el proceso con un LOGIN_SUCCESS, que respalda toda la información del usuario en Redux
        yield put({type: LOGIN_SUCCESS, payload:userData})


    }
    catch(error){  

        //En caso de error, despacho LOGIN_ERROR
        yield put({type:LOGIN_ERROR, error}) 

    }
    finally{

        //Paso final: Se detiene el indicador de carga.
        yield put(setLoading(false))

    }

}

