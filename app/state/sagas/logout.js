//dependecies
import { call, put } from 'redux-saga/effects';

//sagas
import { signOut } from './authMethods';

//actions
import { clearData } from '../ducks/system/systemActions';

export default function* logout(){
    
    yield call(signOut)
    yield put(clearData())

}