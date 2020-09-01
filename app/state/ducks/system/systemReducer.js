
import { handleActions } from 'redux-actions';
import { 
    SET_SHIPPING_TIME,
    SET_SESSION,
    SET_REGISTER_DATA,
    SET_SYSTEM,
    CLEAN_SCOPE,
    SET_FIREBASE_USER,
    SET_NET_INFO

} from './systemConstants';

const defaultSystem = {
    shippingTime: null,
    services:{
        facebook:null,
        google:null,
        firebase:null,
    },
    session: null,
    netInfo:{}
}



const setShippingTime = (state,action) =>{

    const time = action.payload;
    return {...state, shippingTime: time}

}

const setSession = (state, action)=>{

    return { ...state, session:{...state.session, ...action.payload}}

}

const setRegisterData = (state, action)=>{

    return { 
        ...state, 
        services:{
            ...state.services,
            email:{
                ...state.services.email,
                ...action.payload
            }
        }
    }

}


const setSystem = (state,action) =>{

    return { ...state, ...action.payload }

}

const setFirebaseUser = (state, action) =>{


    return Object.assign({}, state, {
        services:{
            ...state.services,
            firebase:{
                user: {
                    ...state.services.firebase?.user,
                    ...action.payload
                }
            }
        }
    })

}

const setNetInfo = (state, action) =>{

    return { ...state, netInfo:{...state.netInfo, ...action.payload}}

}

const cleanScope = (state,action)=>{
    return { ...defaultSystem, netInfo:state.netInfo }
}

const systemReducer = handleActions(
    {      
        [SET_SHIPPING_TIME]:setShippingTime,
        [SET_FIREBASE_USER]:setFirebaseUser,
        [SET_SESSION]:setSession,
        [SET_REGISTER_DATA]:setRegisterData,
        [SET_SYSTEM]:setSystem,
        [SET_NET_INFO]:setNetInfo,
        [CLEAN_SCOPE]: cleanScope
    },
    defaultSystem
);

export default systemReducer;