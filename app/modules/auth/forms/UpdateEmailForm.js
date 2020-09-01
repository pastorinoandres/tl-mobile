import * as yup from 'yup';
import getValidateFunction  from './../../../services/validation';


//DataForm & Settings

export const defaultValues={
    email:'',
}

export const field= {

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
}
    


const getValidationSchema = (values)=>{
    return yup.object().shape({
        email: yup
        .string()
        .email('El email no es valido')
        .required('Falta completar el correo'),
    })
}


export const handleValidate = (values)=> {
    return getValidateFunction(values,getValidationSchema)
}







