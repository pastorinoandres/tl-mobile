//dependecies
import { call, delay, put } from 'redux-saga/effects';
import { Alert } from 'react-native';

//services
import showError from '../../services/showError';

//sagas
import changeTo from './changeTo';
import { sendEmailVerification as sendFirebaseEmailVerification} from './authMethods'

//actions
import { setShippingTime } from './../ducks/system/systemActions';

//constants
import { EMAIL_VERIFICATION_SENT } from '../ducks/system/systemConstants';



export default function* sendEmailVerification(){

    try {

        yield call(sendFirebaseEmailVerification)
        yield put(setShippingTime(new Date()))
        yield put({type:EMAIL_VERIFICATION_SENT})
        yield delay(3000)
        yield call(changeTo, 'sent')
        
    } catch (error) {

        if(error?.code === 'auth/too-many-requests'){
            Alert.alert('Paso muy poco tiempo desde que envió la confirmación a su correo. Espere unos minutos para reintentarlo')
        }else{
            showError(error)
        }
        
    }

    

}