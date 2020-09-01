
import { handleActions } from 'redux-actions';
import { SET_PROFILE, ADD_PROVIDER, SET_USER, ADD_PERMISSION, CLEAN_SCOPE } from './userConstants';
import { LOGIN_SUCCESS } from '../system/systemConstants';




// const defaultUser = {
    
//     profile:{
//         // name:undefined,
//         // surname:undefined,
//         // alias:undefined,
//         // birth: undefined,
//         // nationality:undefined,
//         // sex: undefined
//     },
//     authData:null,    
//     providers:[],
//     permissions:[]        
// }

const setProfile = (state,action) => {
    
    return {...state, profile:{...action.payload}}
}



const setUser = (state, action) =>{
    return { ...state, ...action.payload }
}

const addProvider = (state,action) =>{


    if(state.providers?.length){

        let copyProviders = state.providers.filter((provider) => provider !== action.payload )
      
        copyProviders.push(action.payload); 
        return { ...state, providers:copyProviders }

    }
    else{
        return { ...state, providers:[action.payload] }
    }

    //Objetivo: Insertar el provider dado al final del array. Si ya lo tenia, me encargo de reordenarlo.
    //Si es un array vacio, simplemente agrego el provider dado.
}

const addPermission = (state,action) =>{

    if(state?.permissions){
        return { ...state, permissions:[...state.permissions, action.payload] }
    }else{
        return { ...state, permissions:[ action.payload ]}
    }

}


const userReducer = handleActions(
    {      
        [SET_PROFILE]: setProfile,
        [SET_USER]: setUser,
        [LOGIN_SUCCESS]:setUser,
        [ADD_PROVIDER]: addProvider,
        [ADD_PERMISSION]:addPermission,
        [CLEAN_SCOPE]: ()=> null,
    },
    null
);

export default userReducer;