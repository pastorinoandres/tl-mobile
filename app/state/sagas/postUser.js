//dependecies
import { select, call, put } from "redux-saga/effects";

//services
import { auth, db } from "../../services/firebase";

//selectors
import { getProvider } from "../ducks/system/systemSelectors";

//sagas
import { setFirebaseUser } from "../ducks/system/systemActions";
import { updateProfile } from "./authMethods";





export default function* postUser(){


    //Defino constantes útiles para el proceso
    const provider = yield select( getProvider )
    
    
    //Obtengo la información del usuario, extrayendola del proveedor.
    let userData;

    switch (provider) {

        case 'facebook.com':{
            const { first_name: name, last_name: surname } = yield select( state => state.system.services.facebook?.profile )
            userData = { profile: { name, surname, alias:name }, permissions:['INVITADO'] }
            break;
        
        }
            
        case 'google.com':{
            const { given_name:name, family_name:surname  } = yield select( state => state.system.services.google?.profile )         
            userData = { profile: { name, surname, alias:name }, permissions:['INVITADO'] }
            break;        
        }

        case 'password':{
            const { name, surname } = yield select( state => state.system.services.email.profile )
            userData = { profile: { name, surname, alias:name }, permissions:null }
            break;        
        }
    
        default:
            break;
    }

  
    //Seteo el usuario en Firebase
    const docRef = db.collection('users').doc(auth.currentUser.uid)
    yield call([docRef,docRef.set], userData);

    
    //Si el provider es facebook, mejoro la foto actual, solitando una de mejor calidad a Facebook
    if(provider === 'facebook.com') {yield call(upgradePhotoURLFromFacebook) }


    //Si el provider es el correo, actualizo la propiedad displayName de Firebase
    if(provider === 'password') { yield call(upgradeDisplayName )}


    //Si todo salió bien, retorno el mismo usuario que guarde en Firestore
    return userData;


}




function* upgradePhotoURLFromFacebook(){


    //Defino constantes útiles para el proceso
    const { token, profile:{ id } } = yield select( state => state.system.services.facebook )
    const apiUrl = `https://graph.facebook.com/${id}?access_token=${token}&fields=name,birthday,picture.type(large)`


    //Actualizó la foto de facebook, por una de mayor calidad.
    const apiGraph = yield call(fetch, apiUrl)
    console.log({apiGraph}); 
    const { picture: { data: { url:photoURL }} }  = yield call([apiGraph,apiGraph.json]) 
    yield call(updateProfile, {photoURL})


    //Actualizo datos de Firebase en Redux (auth.currentData.photoUrl)
    yield put(setFirebaseUser({photoURL}))

    
}


function* upgradeDisplayName(){
    const { name, surname } = yield select( state => state.system.services.email.profile )
    const displayName = `${name} ${surname}`
    yield call(updateProfile, {displayName})
    yield put(setFirebaseUser({displayName}))
}