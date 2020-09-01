import * as yup from 'yup';
import getValidateFunction  from './../../../services/validation';


//DataForm & Settings

export const defaultValues={
    email:'',
    password:'',
}

export const fields=[
    {
        props:{
            name:'email',
            label: 'Escriba su correo',
            placeholder: 'ejemplo@dominio.com',
            type:'email',
            keyboardType: 'default',
            withIcon: true,
            autoFocus:true
        },
        type:'TextInput'
    },
    {
        props:{
            name:'password',
            label: 'Escriba la contraseña',
            placeholder: '********', 
            type:'password',
            keyboardType: 'default',
            withIcon: true,
            autoFocus:false
        },
        type:'TextInput'
    },
    
]

const getValidationSchema = (values)=>{
    return yup.object().shape({
        email: yup
        .string()
        .email('El email no es valido')
        .required('Falta completar el correo'),
        password: yup
        .string()
        .min(6,'Debe tener al menos 6 caracteres')
        .required('Falta completar la contraseña'),
    })
}


export const handleValidate = (values)=> {
    return getValidateFunction(values,getValidationSchema)
}







