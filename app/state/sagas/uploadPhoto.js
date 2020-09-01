
//dependecies
import { Alert } from 'react-native';
import { call, put, take, fork } from 'redux-saga/effects';

//sagas
import { deleteUser } from './authMethods';

//services
import firebase, { auth, db, storage }  from '../../services/firebase';

//actions
import { setFirebaseUser, cancelRegister, clearData } from "../ducks/system/systemActions";
import { setScreenState } from './../ducks/screens/screensActions';
import { addPermission } from '../ducks/user/userActions';

//constants
import { ADD_PHOTO } from '../../navigation/constants';
import { UPLOAD_PHOTO, CANCEL_REGISTER } from '../ducks/system/systemConstants';



function* cancelProcess(){

    yield take(CANCEL_REGISTER)
            
    try {

        yield call(deleteUser)
        yield put(clearData())
        
    } catch (error) {

        console.log({error})
        
    }

}



export default function* uploadPhoto(){

    
    const cancelTask = yield fork(cancelProcess);        

    try {

        console.log('estoy en upload foto');


        const { payload:uri } = yield take(UPLOAD_PHOTO)

        yield put(setScreenState(ADD_PHOTO,{loading:true}))        
        yield call(putInStorage,uri)
        yield call(setPhotoInFirebase)
        yield call(addPermissionInFirebase, 'INVITADO')
        yield put(addPermission('INVITADO'))
        
    } catch (error) {

        if(error){
            console.log({error});
            Alert.alert('No se pudo subir la foto', 'Vuelve a intentarlo dentro de unos minutos')   
        }   
            
        
    }
    finally{
        yield put(setScreenState(ADD_PHOTO,{loading:false}))
        cancelTask.cancel()
    }
    

}
    

function* putInStorage(uri){
    
    const { uid } = auth.currentUser;
    const response = yield call(fetch,uri)
    const blob = yield call([response,response.blob])
    const ref = storage.ref().child(`users/${uid}/profile/photo`)
    yield call([ref,ref.put],blob)       
    
}
    
    
    
function* setPhotoInFirebase(){

    const { uid } = auth.currentUser;
    const ref = storage.ref().child(`users/${uid}/profile/photo`)
    const photoURL = yield call([ref,ref.getDownloadURL])
    yield call([auth.currentUser,auth.currentUser.updateProfile],{photoURL});
    yield put(setFirebaseUser({photoURL}))
}




function* addPermissionInFirebase(permission){

    const docRef = db.collection('users').doc(auth.currentUser.uid)    
    yield call([docRef,docRef.update], {permissions:firebase.firestore.FieldValue.arrayUnion(permission)})
    
}
