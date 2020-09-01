import { createAction } from 'redux-actions';
import { 
    SET_PROFILE,
    SET_USER,
    ADD_PROVIDER,
    ADD_PERMISSION,
} from './userConstants';

import { toString } from '../../../services/convertDates'

const convertData = (data)=>{

    if(data.birth instanceof Date){

        const birth = data.birth //JavaScript Date
        const birthString = toString(birth)
        return {...data, birth:birthString}

    }else{

        return data
        
    }

    
}


//ReducerActions
export const setProfile = createAction(SET_PROFILE,convertData)
export const setUser = createAction(SET_USER)
export const addProvider = createAction(ADD_PROVIDER)
export const addPermission = createAction(ADD_PERMISSION)

