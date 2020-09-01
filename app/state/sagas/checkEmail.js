
//dependencies
import { select, call, put, take } from 'redux-saga/effects';

//services
import showError from '../../services/showError';

//sagas
import changeTo from './changeTo';
import { signOut, signInWithEmailAndPassword, isEmailVerified } from './authMethods';


//selectors
import { getRegisterData } from '../ducks/system/systemSelectors';

//constants
import { VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_CHECK, EMAIL_VERIFICATION_SENT } from './../ducks/system/systemConstants';



export default function* checkEmail(){

    yield take(EMAIL_VERIFICATION_SENT)

    try {

        while(true){

            yield take(VERIFY_EMAIL_CHECK)
            
            const { email , password } = yield select(getRegisterData)
    
            yield call(signOut)
            yield call(signInWithEmailAndPassword, email, password)

            const emailVerified = yield call(isEmailVerified)
    
            if(emailVerified){
    
                yield put({type:VERIFY_EMAIL_SUCCESS}) 
    
            }else{
    
                yield call(changeTo,'error')
    
            }
        }

        
    } 
    catch(error){

        showError(error)
        
    }

}