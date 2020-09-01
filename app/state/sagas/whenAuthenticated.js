
//dependecies
import { call, take} from 'redux-saga/effects';

//constants
import { LOGOUT } from './../ducks/system/systemConstants';

//sagas
import logout from './logout';


export default function* whenAuthenticated(){

    yield take(LOGOUT)
    yield call(logout)

}