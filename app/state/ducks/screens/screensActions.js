import { createAction } from 'redux-actions';
import { 
    SET_SCREEN_STATE,
} from './screensConstants';



//ReducerActions

export const setScreenState = (screen, payload)=>{

    return {
        type: SET_SCREEN_STATE,
        screen,
        payload
    }

}


