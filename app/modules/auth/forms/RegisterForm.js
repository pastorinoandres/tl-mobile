

import * as yup from 'yup';
import getValidateFunction  from './../../../services/validation';

import { auth } from './../../../services/firebase';
import { errorMessage } from '../../../services/showError';

//DataForm & Settings
    
export const defaultValues={
    name:'',
    surname:'',
    email:'',
    password:'',
    passwordConfirmation:''
}


const fetchEmailErrors = async(email)=>{
    
    
            
    return await auth.fetchSignInMethodsForEmail(email).then((methods)=>{

        if(methods.length>0){
            const errMsg = errorMessage(methods[0],email)                
            return errMsg
        }
        else{
            return false
        }
        
    })

}


export const fields=[
    {
        props:{
            name:'name',
            label: 'Nombre',
            placeholder: 'Ej: Juan',
            type:'name',
            keyboardType: 'default',
            withIcon: false,
            autoFocus:true
        },
        type: 'TextInput'
    },
    {
        props:{
            name:'surname',
            label: 'Apellido*',
            placeholder: 'Ej: Perez',
            type:'off',
            keyboardType: 'default',
            withIcon: false,
            autoFocus:false
        },
        type:'TextInput'
    },
    {
        props:{
            name:'email',
            label: 'Correo',
            placeholder: 'ejemplo@dominio.com',
            type:'email',
            keyboardType: 'default',
            withIcon: false,
            autoFocus:true                
        },
        type:'TextInput',
        serverValidation: fetchEmailErrors
    },
    {
        props:{
            name:'password',
            label: 'Contraseña',
            placeholder: '********',
            type:'password',
            keyboardType: 'default',
            withIcon: false,
            autoFocus:false,
        },
        type:'TextInput'
    },
    {
        props:{
            name:'passwordConfirmation',
            label: 'Repita la contraseña',
            placeholder: '********',
            type:'password',
            keyboardType: 'default',
            withIcon: false,
            autoFocus:false,
            autoCompleteType: false,
        },
        type:'TextInput'
    }

]





const getValidationSchema = (values)=>{
    
    return yup.object().shape({
        name: yup
            .string()
            .required('Falta completar el nombre'),
        surname: yup
            .string()
            .required('Falta completar el apellido'),
        email: yup
            .string()
            .email('El email no es valido')
            .required('Falta completar el correo'),
        password: yup
            .string()
            .min(6,'Debe tener al menos 6 caracteres')
            .required('Falta completar la contraseña'),
        passwordConfirmation: yup
            .string()
            .oneOf([values.password], 'Las contraseñas no coinciden')
            .required('Falta completar la contraseña'),
    })
}



export const handleValidate = (values)=> {
    return getValidateFunction(values,getValidationSchema,false) 
}