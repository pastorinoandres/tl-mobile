
//dependecies
import { call, select } from 'redux-saga/effects';

//services
import { auth, db, EmailAuthProvider, FacebookAuthProvider, GoogleAuthProvider } from '../../services/firebase';


export function* reauthenticateWithCredential(){
    const credential = yield call(generateCredential)
    yield call([auth.currentUser, auth.currentUser.reauthenticateWithCredential], credential)    
}

export function* updateEmail(email){
    yield call([auth.currentUser, auth.currentUser.updateEmail], email)
}

export function* signOut(){
    yield call([auth,auth.signOut])
}

export function* signInWithEmailAndPassword(email, password){
    return yield call([auth, auth.signInWithEmailAndPassword], email, password)    
}

export function* sendEmailVerification(){
    console.log({user:auth.currentUser})
    yield call([auth.currentUser,auth.currentUser.sendEmailVerification])
}

export function isEmailVerified(){
    return auth.currentUser.emailVerified
}

export function* generateCredential(){
  
    const provider = yield select( state => state.system.session.provider )
  
    switch(provider){
  
        case 'password':{
  
          const registerData = yield select( state => state.system.services.email)
          if(registerData){
  
            const { email, password } = registerData;
            return EmailAuthProvider.credential(email, password)
  
          }else{
            return null
          }
  
        }
  
        case 'facebook.com':{
  
          const token = yield select( state => state.system.services.facebook?.token )
  
          if(token){
            return FacebookAuthProvider.credential(token);
          }else{
            return null
          }
  
        }
  
        case 'google.com':{
  
          const idToken = yield select( state => state.system.services.google?.idToken )
  
          if(idToken){
            return GoogleAuthProvider.credential(idToken);
          }else{
            return null
          }
  
        }
    }
  
}

export function* deleteUser(){

  if(auth.currentUser){

    const credential = yield call(generateCredential)
    
    yield call([auth.currentUser, auth.currentUser.reauthenticateWithCredential],credential)
  
    const docRef = db.collection('users').doc(auth.currentUser.uid)
  
    yield call([docRef,docRef.delete])
    yield call([auth.currentUser,auth.currentUser.delete])
    
  }

}

export function* createUserWithEmailAndPassword( email, password ){

  //Uso el email y la contraseña para crear una cuenta en Firebase. Esta request retorna información útil de Firebase Auth.   
  return yield call ([auth, auth.createUserWithEmailAndPassword], email, password)

} 

export function* createCredential(provider, token){

  let credentials;

  if(provider ==='facebook'){
    credentials = yield call([FacebookAuthProvider,FacebookAuthProvider.credential], token )
  }

  if(provider ==='google'){
    credentials = yield call([GoogleAuthProvider,GoogleAuthProvider.credential], token )
  }

  return credentials;
  
}

export function* signInWithCredential(credentials){

  return yield call([auth, auth.signInWithCredential], credentials)

}

export function* updateProfile(values){
  yield call([auth.currentUser,auth.currentUser.updateProfile], values)
}

export function* sendPasswordResetEmail(email){
  yield call([auth,auth.sendPasswordResetEmail],email)
}


