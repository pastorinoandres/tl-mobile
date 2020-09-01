
import { put } from 'redux-saga/effects';
import { setSystem } from './../ducks/system/systemActions';


export default function* initializeSystem(nameProvider, responseFirebase, responseProvider){

    console.log({initializeSystem:{nameProvider, responseProvider, responseFirebase}});

    //Descomprimo información pasada por parametro.
    const { additionalUserInfo: { profile, providerId }, user } = responseFirebase
    const { displayName, email, emailVerified, phoneNumber, photoURL } = user.toJSON()


    //Creo objeto siguendo el modelo de System.
    const systemData = {
        services:{
            [nameProvider]:{
                profile,
                ...responseProvider, 
                
            },            
            firebase:{
                user: { 
                    displayName, 
                    email, 
                    emailVerified, 
                    phoneNumber, 
                    photoURL 
                }
            },              
        },
        session:{ 
            provider:providerId                    
        }

    }


    //Seteo dicho objeto en Redux    
    yield put(setSystem(systemData))

}