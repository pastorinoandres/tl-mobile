
//dependecies
import { call, put, select } from 'redux-saga/effects';
import * as Facebook from 'expo-facebook';

//utils
import facebook from '../../utils/facebook'

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





export default function* loginWithFacebook(){
    
    const setLoading = (value)=>{
        return setScreenState(AUTH, state => ({loadings:{...state.loadings, ['facebook']:value }}))
    }

    try{
        
        const { app_id, permissionsList } = facebook.settings

        //Paso 1: Muestro indicador de carga
        yield put(setLoading(true))

        
        //Paso 2: Inicializo Facebook
        yield call([Facebook, Facebook.initializeAsync], app_id, "TuLaburo");


        //Paso 3: Solicito entre otras cosas, el token a Facebook, especificando los permisos necesarios para poder operar en la aplicación. 
        const { type, token, expires, permissions, declinePermissions } = yield call([Facebook, Facebook.logInWithReadPermissionsAsync], {permissions:permissionsList} )


        //LOGIN_CANCELLED: Si el usuario cierra el modal, se cancela toda la operación.
        if (type === 'cancel') { yield put({type:LOGIN_CANCELLED}) }


        //Paso 4: A partir del token, genero la credencial con un método provisto por Firebase.
        const credentials = yield call(createCredential, 'facebook', token)


        //Paso 5: Armo un objeto que contenga la información útil de Facebook
        const response_facebook = { token, expires, permissions, declinePermissions}


        //Paso 6: Uso la credencial para iniciar session. Esta request retorna información útil de Firebase Auth.   
        const response_firebase = yield call(signInWithCredential, credentials)


        //Paso 7: Normalizó la información conseguida, bajo el modelo de System y la seteo en Redux
        yield call(initializeSystem, 'facebook', response_firebase, response_facebook)
         

        //Paso 8: Descargamos los datos del usuario. Si no existen, añadimos un nuevo registro a la base de datos de Firestore.
        let userData = yield call(fetchUser)        
        if(!userData){ userData = yield call(postUser) }


        //Paso 9: Finalizo el proceso con un LOGIN_SUCCESS, que respalda toda la información del usuario en Redux
        yield put({type: LOGIN_SUCCESS, payload:userData})
        console.log(yield select( state => ({system: state.system}) ))


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


