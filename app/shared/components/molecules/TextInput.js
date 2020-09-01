
import React from 'react';
import { TextInput as TextInputRN } from 'react-native';
import { Line, Group, IconTouchable } from '../atoms';
import InputLabel from '../molecules/InputLabel';
import InputError from '../molecules/InputError';
import { colors, typography, ui, calculateSize } from '../../styles';
import { Email, Candado, Hide, Show } from '../../vectors';
import { useToogle } from  './../../../hooks';


const Label = InputLabel;
const Error = InputError;

const TextInput = (props)=>{

    //Destructuración de props     
    const { 
        name, 
        placeholder, 
        type, 
        keyboardType, 
        withIcon = false,
        serverValidation, 
        sizeFont = "body-18", 
        label, 
    } = props;

    const { 
        values, 
        handleChange, 
        setFieldTouched, 
        errors, 
        touched, 
        autoFocus, 
        setFieldError 
    } = props.formik


    //Estado interno
    const [focus, toogleFocus] = useToogle(false)
    const [securePassword, toogleSecurePassword] = useToogle(true)


    const TypeIcon = ()=>{

        let TypeIcon, colorIcon

        //Logica de estilos
        if(errors[name] && touched[name]){
            colorIcon =  colors.error.primary                     
        }
        else{
            colorIcon = colors.acento.primary
        } 

        switch (type) {
            case 'email':
                TypeIcon = Email;
                break;
            
            case 'password':
                TypeIcon = Candado;
                break;
        
            default:
                break;
        }

        if(withIcon && TypeIcon){
            return (<TypeIcon size={calculateSize(24)} color={colorIcon}/>)
        }
        else{
            return null
        }

    }


    const EyeIcon = () =>{

        const startWrite = (values[name]) && (values[name].length>0)

        if(type==='password' && startWrite ){

            return (<IconTouchable Icon={(securePassword)?Show:Hide} size={calculateSize(24)} area={calculateSize(40)} onPress={toogleSecurePassword}/>)
            
        }else{
            return null
        }

    }

    //Lógica de estilos
    const thickness = (focus) ? 2 : 1;

    let color = colors.grey.t40;

    if(focus){
        color = colors.acento.primary
    }

    if(errors[name] && touched[name]){
        color = colors.error.primary
    }

     //Estilos
     const styles={

        container:{
            marginVertical:ui.margin,
        },
        inputContainer:{
            flexDirection: 'row', 
            justifyContent: 'space-between',
            alignItems:'center',
            paddingHorizontal: 2
        },
        input:{
            ...typography[sizeFont].typography,                
            height:calculateSize(40),
            flex:1,
            paddingHorizontal:(withIcon)?ui.padding-calculateSize(10):0,
            color:colors.grey.t80
        },
        line:{
            color, 
            thickness
        }
    }


    return(

        
        <Group style={styles.container} >

            <Label text={label}/>

            <Group style={styles.inputContainer}>

                <TypeIcon/>

                <TextInputRN 
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor={colors.grey.t40}
                    keyboardType={keyboardType}
                    value={values[name] || ''}
                    onBlur= {() => {
                        setFieldTouched(name);
                        toogleFocus();
                        const formated = values[name].trim()
                        handleChange(name)(formated); 
                        serverValidation && serverValidation(values[name]).then((error)=>{
                            error && setFieldError(name,error)
                        })                            
                    }}
                    onChangeText={(e)=>{
                        handleChange(name)(e); 
                    }}
                    secureTextEntry={ (type==='password') && securePassword}
                    onFocus={toogleFocus}
                    autoCompleteType={type}
                    autoFocus={autoFocus}
                    contextMenuHidden={(type==='password')}
                    >
                </TextInputRN>

                <EyeIcon/>
                        
            </Group>
                        
            <Line {...styles.line}/>

            <Error error={errors[name]} touched={touched[name]}/>

        </Group>

    )
    

}

export default TextInput;


