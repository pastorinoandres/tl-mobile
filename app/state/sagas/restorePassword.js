
//dependecies
import { put, take, delay, call } from 'redux-saga/effects';

//services
import showError from '../../services/showError';

//sagas
import { sendPasswordResetEmail } from './authMethods';

//actions
import { setScreenState } from '../ducks/screens/screensActions';

//constants
import { RESTORE_PASSWORD } from './../ducks/system/systemConstants';
import { SIGN_IN } from '../../navigation/constants';



export default function* restorePassword(){

    const setLoading = (value)=>{
        return setScreenState(SIGN_IN, state => ({loadings:{...state.loadings, ['restorePassword']:value }}))
    }

    while(true){

        try{

            const { payload:email } = yield take(RESTORE_PASSWORD)

            //Mostramos indicador de carga
            yield put(setLoading(true))
            
            //Enviamos correo
            yield call(sendPasswordResetEmail,email)

            //Habiendo pasado 2 segundos, ocultamos indicador de carga
            yield delay(3000)
            yield put(setLoading(false))     
            
            //Seteamos el marcador de 'enviado' en true
            yield put(setScreenState(SIGN_IN, {sent:true} ))

            //A los 10 segundos lo seteamos en false para que pueda volver a enviar un correo.
            yield delay(30000)
            yield put(setScreenState(SIGN_IN, {sent:false} ))   

        }
        catch(error){

            showError(error)
            yield put(setLoading(false))

        }

        
    }

}