//dependecies
import { call } from 'redux-saga/effects';

//services
import { auth, db } from '../../services/firebase';



export default function* fetchUser(){


    //Descargo el usuario usando su uid.
    const refDoc = db.collection('users').doc(auth.currentUser.uid);
    const snap = yield call([refDoc,refDoc.get])


    //Convierto la información, en un formato válido.
    const userData = yield call([snap,snap.data])
    

    //Retorno la información del usuario descargada. (Si no existe, retorno UNDEFINED)
    return userData;

}