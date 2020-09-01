
import { handleActions } from 'redux-actions';
import { SET_SCREEN_STATE } from './screensConstants';

const setScreenState = (state,action) =>{

    if(typeof(action.payload) === 'function'){

        return{
            ...state, 
            [action.screen]: {
                ...state[action.screen],
                ...action.payload(state[action.screen])
            }
        }

    }else{

        return{
            ...state, 
            [action.screen]: {
                ...state[action.screen],
                ...action.payload
            }
        }

    }
    
}

const screensReducer = handleActions(
    {      
        [SET_SCREEN_STATE]:setScreenState,
    },
    {}
);

export default screensReducer;