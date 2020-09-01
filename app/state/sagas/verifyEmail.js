
//dependecies
import { call, put, take, fork, delay  } from 'redux-saga/effects';

//sagas
import changeTo from './changeTo';
import sendEmailVerification from './sendEmailVerification';
import handleAppStateChange from './handleAppStateChange';
import countdown from './countdown'
import checkEmail from './checkEmail'
import updateEmail from './updateEmail';
import { deleteUser } from './authMethods';

//actions
import { setFirebaseUser, clearData } from '../ducks/system/systemActions';
import { setScreenState } from './../ducks/screens/screensActions';

//constants
import { VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_RESET, CANCEL_REGISTER } from '../ducks/system/systemConstants';
import { EMAIL_CONFIRMATION } from '../../navigation/constants';



export default function* verifyEmail(){

    
        const updateEmailTask           = yield fork(updateEmail)
        const sendEmailVerificationTask = yield fork(sendEmailVerification)        
        const countdownTask             = yield fork(countdown)
        const handleAppStateChangeTask  = yield fork(handleAppStateChange)
        const checkEmailTask            = yield fork(checkEmail)
    
        const { type } = yield take([VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_RESET , CANCEL_REGISTER])

        updateEmailTask.cancel();
        sendEmailVerificationTask.cancel()
        countdownTask.cancel();
        handleAppStateChangeTask.cancel();
        checkEmailTask.cancel();
    
        if(type === VERIFY_EMAIL_SUCCESS){  
    
            yield call(changeTo, 'successful')        
            yield delay(4000)
            yield put(setFirebaseUser({emailVerified:true}))
    
        }
    
        if (type === VERIFY_EMAIL_RESET){
            
            yield put(setScreenState(EMAIL_CONFIRMATION,{ready:false,viewed:false,remaningTime:60}))
            yield call(changeTo, 'sending')
    
        }
    
        if (type === CANCEL_REGISTER){
            
            try {

                yield call(deleteUser)
                yield put(clearData())
                
            } catch (error) {

                console.log({error})
                
            }
            
        }

        


}
