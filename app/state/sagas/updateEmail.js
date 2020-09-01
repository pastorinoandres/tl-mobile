
//dependecies
import { take, put, delay, call } from 'redux-saga/effects';

//services
import showError from '../../services/showError';

//actions
import { setScreenState } from './../ducks/screens/screensActions';

//constants
import { UPDATE_EMAIL, VERIFY_EMAIL_RESET } from '../ducks/system/systemConstants';
import { setRegisterData, setFirebaseUser } from '../ducks/system/systemActions';
import { reauthenticateWithCredential, updateEmail as updateFirebaseEmail} from './authMethods';


export default function* updateEmail(){

    while(true){
 
        try {

            const { payload:email } = yield take(UPDATE_EMAIL)

            yield put(setScreenState(UPDATE_EMAIL,{loading:true}))
            yield call(reauthenticateWithCredential)
            yield call(updateFirebaseEmail, email)

            yield delay(2000)

            yield put(setFirebaseUser({email}))
            yield put(setRegisterData({email}))

            yield put({type:VERIFY_EMAIL_RESET})
            
        } catch (error) {

            showError(error)
            
        }
        finally{

            yield put(setScreenState(UPDATE_EMAIL,{loading:false}))

        }
    
    
    }

}