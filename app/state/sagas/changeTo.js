//dependecies
import { put, select } from 'redux-saga/effects';

//actions
import { setScreenState } from './../ducks/screens/screensActions';

//selectors
import { getScreenState } from './../ducks/screens/screensSelectors';

//constants
import { EMAIL_CONFIRMATION } from '../../navigation/constants';


export default function* changeTo(scene){

    console.log('entro a changeTo');

    const { frontScene, backScene, face } = yield select(state => getScreenState(state,EMAIL_CONFIRMATION))

    if(face === 'front'){
        yield put(setScreenState(EMAIL_CONFIRMATION, {backScene: scene} ))
        yield put(setScreenState(EMAIL_CONFIRMATION, {face: 'back',activeScene:scene} ))
    }else{
        yield put(setScreenState(EMAIL_CONFIRMATION, {frontScene: scene} ))
        yield put(setScreenState(EMAIL_CONFIRMATION, {face: 'front',activeScene:scene} ))  
    }

}