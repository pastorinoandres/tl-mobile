import { Alert } from 'react-native';
import { auth } from './firebase'

export const errorMessage = (provider, email)=>{

    switch (provider) {
        case 'password':
            return `Esta cuenta fue registrada previamente con email y contraseña. Inicie sesión`
        case 'facebook.com':
            return `El correo ${email} esta vinculado con una cuenta de Facebook. Inicie sesion con la misma`
        case 'google.com':
            return `El correo ${email} esta vinculado con una cuenta de Google. Inicie sesion con la misma`    
        default:
            return `Ya esta en uso esta cuenta`
    }

}


const fetchSignInMethodsForEmail = (email)=>{

    auth.fetchSignInMethodsForEmail(email)
    .then((methods)=>{
        Alert.alert('Email en uso', errorMessage(methods[0],email))
    })

}

export default function showError(error,params){

    console.log("******************************");
    console.log("==============>", {error});
    console.log("******************************");

    let titleError, msgError

    switch(error.code){

        case 'auth/account-exists-with-different-credential':{;
            fetchSignInMethodsForEmail(error.email)
            break;
        }

        case 'auth/email-already-in-use':{
            fetchSignInMethodsForEmail(params.email)
            break;
        }

        case 'auth/invalid-credential':
            titleError= 'Credencial invalida'
            msgError= 'Por favor intentelo más tarde o informenos este error';        
            break;

        case 'auth/operation-not-allowed':
            titleError= 'Ha ocurrido un error'
            msgError= 'Por favor intentelo más tarde';        
            break;

        case 'auth/weak-password':
            titleError= 'Contraseña poco segura'
            msgError= 'Sugerencia: Combinación de números, letras y simbolos, Alternar entre mayusculas y minusculas.';        
            break;

        case 'auth/invalid-email':
            titleError = 'Correo invalido'; 
            msgError = 'Asegurate de escribir bien el correo';        
            break;
        
        case 'auth/user-not-found':
            titleError = 'Datos invalidos'; 
            msgError = 'Asegurate de escribir bien el correo y la contraseña';        
            break;

        case 'auth/wrong-password':
            titleError = 'Datos invalidos'; 
            msgError = 'Asegurate de escribir bien el correo y la contraseña';        
            break;
            
        case 'auth/captcha-check-failed':
            titleError = 'Ha ocurrido un error'; 
            msgError = 'Por favor intentelo más tarde';        
            break;

        case 'auth/invalid-phone-number':
            titleError = 'Teléfono invalido'; 
            msgError = 'Asegurese de escribirlo bien';        
            break;
            
        case 'auth/quota-exceeded':
            titleError = 'Ha ocurrido un error'; 
            msgError = 'Por favor intentelo más tarde';        
            break;

        case 'auth/user-disabled':
            titleError = 'Error inesperado'; 
            msgError = 'Tu usuario esta deshabilitado temporalmente';        
            break;
            
        case 'auth/provider-already-linked':
            titleError = 'Ha ocurrido un error'; 
            msgError = 'Por favor intentelo más tarde';        
            break;
        
        case 'auth/credential-already-in-use':
            titleError = 'Número en uso'; 
            msgError = 'Ya existe otro usuario usando el mismo número';        
            break;
            
        case 'auth/invalid-verification-code':
            titleError = 'Código incorrecto'; 
            msgError = 'Asegurese de escribirlo bien, de lo contrario se podria bloquear.';        
            break;

        case 'auth/invalid-verification-id':
            titleError = 'Ha ocurrido un error'; 
            msgError = 'Por favor intentelo más tarde';        
            break;

        case 'auth/too-many-requests':
            titleError = 'Servicio temporalmente no disponible'; 
            msgError = 'Por favor intentelo más tarde';        
            break;

        case 'auth/invalid-recipient-email':
            titleError= 'Ha ocurrido un error'
            msgError = 'Por favor intentelo más tarde'
            break;

        default:
            titleError= 'Ha ocurrido un error'
            msgError = 'Por favor intentelo más tarde'
            break;

    }

    if(titleError && msgError) {
        Alert.alert(titleError,msgError)
    }

}