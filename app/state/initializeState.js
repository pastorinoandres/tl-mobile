
import { AUTH, SIGN_IN, REGISTER, ADD_PHOTO, EMAIL_CONFIRMATION, UPDATE_EMAIL } from './../navigation/constants';

const waitingTime = 60
const screens = {

        [AUTH]:{
            loadings:{
                'facebook':false,
                'google':false,
            }

        },

        [REGISTER]:{
            loadings:{
                'signUp':false,
            }
            
        },

        [EMAIL_CONFIRMATION]:{
            face:'front',            
            remaningTime:waitingTime,
            frontScene:'sending',
            backScene:'sent',
            activeScene:'sending',
            ready:false,
            viewed:false,
        },

        [UPDATE_EMAIL]:{
            loading:false,

        },

        [SIGN_IN]:{
            loadings:{
                'signIn':false,
                'restorePassword':false,                
            },
            sent:false
            
        },

        [ADD_PHOTO]:{
            loading:false,            
        },

}

export default function initializeState(storageData){

    return {...storageData, screens }

}