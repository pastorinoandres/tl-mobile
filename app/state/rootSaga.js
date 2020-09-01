
//dependecies
import { call, take, fork } from 'redux-saga/effects';

//sagas
import getAppState  from './sagas/getAppState'
import loginRequest  from './sagas/loginRequest'
import continueProgress   from './sagas/continueProgress'
import whenAuthenticated  from './sagas/whenAuthenticated'

//constants
import { CLOCKIN } from './ducks/system/systemConstants';
import logout from './sagas/logout';


export default function* rootSaga() {

    yield fork(authenticationFlow);

}

function* authenticationFlow(){

    yield take(CLOCKIN)

    while(true){

        const state = yield call(getAppState)
        
        switch (state) {

            case 'no_progress':
                yield call(loginRequest)                
                break;

            case 'in_progress':
                yield call(continueProgress)                
                break;

            case 'authenticated':
                yield call(whenAuthenticated)            
                break;

            default:
                yield call(logout);
        }

    }
}

















