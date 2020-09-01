
//dependecies
import { call, put } from 'redux-saga/effects';

//sagas
import initializeSystem from './initializeSystem';
import fetchUser from './fetchUser';
import postUser from './postUser';
import { signInWithEmailAndPassword as signIn, createUserWithEmailAndPassword as signUp } from './authMethods';
//actions
import { setScreenState } from '../ducks/screens/screensActions';


//constants
import { LOGIN_SUCCESS, LOGIN_ERROR } from '../ducks/system/systemConstants';
import { SIGN_IN, REGISTER } from './../../navigation/constants';




export default function* loginWithEmail({ method, password, name, surname, email }){

    const userAction = (method === 'signIn') ? signIn : signUp
    const systemAction = (method === 'signIn') ? fetchUser : postUser
    
    const setLoading = (value)=>{

        const screen = (method === 'signIn') ? SIGN_IN : REGISTER ;
        const payload = state => ({loadings:{...state.loadings, [method]:value }})

        return setScreenState(screen,payload)

    }

    try{
        

        //Paso 1: Muestro indicador de carga
        yield put(setLoading(true))


        //Paso 2: Iniciamos sessión o creamos una cuenta respetando el parametro. Esta request retorna información útil de Firebase.
        const response_firebase = yield call(userAction, email, password )


        //Paso 3: Normalizó la información conseguida, bajo el modelo de System y la seteo en Redux
        yield call(initializeSystem, 'email', response_firebase, {password, email, profile:{name, surname}} )


        //Paso 4: Descargamos o subimos los datos del usuario según corresponda.
        const userData = yield call( systemAction, password, name, surname, email )


        //Paso 5: Finalizo el proceso con un LOGIN_SUCCESS, que respalda toda la información del usuario en Redux
        yield put({type: LOGIN_SUCCESS, payload:userData})


    }
    catch(error){  

        //En caso de error, despacho LOGIN_ERROR
        yield put({type:LOGIN_ERROR, error, params:{method,email}}) 

    }
    finally{

        //Paso final: Se detiene el indicador de carga.
        yield put(setLoading(false))

    }

}




