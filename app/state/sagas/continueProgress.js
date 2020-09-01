
//dependecies
import { call, select, take } from 'redux-saga/effects';

//selectors
import { getFirebaseUser } from './../ducks/system/systemSelectors';

//sagas
import verifyEmail from './verifyEmail'
import uploadPhoto from './uploadPhoto';


export default function* continueProgress(){    

    const { emailVerified }  = yield select(getFirebaseUser)

    if(emailVerified) {
        yield call(uploadPhoto)      
    }else{
        yield call(verifyEmail)         
    }

}





