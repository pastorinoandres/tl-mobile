
//dependecies
import { call, take, fork} from 'redux-saga/effects';

//sagas
import loginWithFacebook  from './loginWithFacebook'
import loginWithGoogle  from './loginWithGoogle'
import loginWithEmail from './loginWithEmail';
import restorePassword from './restorePassword';
import logout from './logout';
import { deleteUser } from './authMethods';


//services
import showError from '../../services/showError';

//constanst
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_CANCELLED } from '../ducks/system/systemConstants';






export default function* loginRequest(){

    const restorePasswordTask = yield fork(restorePassword)

    const {payload: { option, params }} = yield take(LOGIN_REQUEST)

    let task;

    switch (option) {

        case 'email':
            task = yield fork(loginWithEmail,params)
            break;                   

        case 'google':
            task = yield fork(loginWithGoogle)        
            break;

        case 'facebook':
            task = yield fork(loginWithFacebook)   
            break;

        default:
            break;

    }

    const action = yield take([LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_CANCELLED])

    if(action.type === LOGIN_CANCELLED){
      task.cancel()
    }

    if(action.type === LOGIN_ERROR){

      showError(action.error, {email:action.params?.email})

      if(action.params?.method === 'signUp'){
        yield call(deleteUser)
      }

      yield call(logout)

    }

    restorePasswordTask.cancel()

    

}
