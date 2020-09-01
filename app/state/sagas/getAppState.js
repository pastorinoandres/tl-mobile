
//dependecies
import { select } from 'redux-saga/effects';

//selectors
import { getIsAuthenticated, getUser, getAuthorization } from './../ducks/user/userSelectors';
import { getSession } from '../ducks/system/systemSelectors';
import { auth } from '../../services/firebase';


export default function* getAppState(){

    const isAuthenticated = yield select(getIsAuthenticated)
    const session = yield select(getSession)
    const userData = yield select(getUser)
    const authorization = yield select(getAuthorization)
  
    if((!auth.currentUser) && (!session) && (!userData)){
        return 'no_progress'
    }
  
    if((auth.currentUser) && (session) && (userData) && (!authorization)){
        return 'in_progress'
    }
  
    if((auth.currentUser) && (isAuthenticated)){
        return 'authenticated'
    }

    
  
}