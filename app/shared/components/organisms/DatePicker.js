

import React, { useState, Fragment } from 'react';
import { Platform, DatePickerIOS as DatePickerIOSRN, FlatList, View, DatePickerAndroid as DatePickerAndroidRN } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { colors, typography, ui, calculateSize } from '../../styles';
import { Text, Card, Line, Group, ModalContainerAnimation } from '../atoms';
import { Button, InputLabel as Label, InputError as Error } from '../molecules';
import { useToogle } from  './../../../hooks';
import moment from 'moment';
import 'moment/locale/es';
const ios = Platform.OS === 'ios'


//Componentes


const DateInput = ({ value, placeholder })=>{

    const styles = {
        flexDirection: 'row',
        flex:1,
        paddingHorizontal: calculateSize(2)
    }
    
    return (

        <Group style={styles}>                
            <Text {
                ...typography["body-18"]} 
                color={(!placeholder)?colors.grey.t80:colors.grey.t40} 
                extraStyles={{height:calculateSize(40),flex:1,textAlign:'left'}}>
                { value }
            </Text>
        </Group>

    )
}



const DatePickerIOS = ({date, onDateChange, placeholder, confirmar, cancelar })=> {

    //Estilos
    let colorScheme = useColorScheme();

    const lightStyle = {
        marginBottom:ui.margin, 
        justifyContent: 'space-around',
        backgroundColor: colors.white()
    }

    const darkStyle = {
        marginBottom:ui.margin, 
        justifyContent: 'space-around',
        backgroundColor: colors.demandantes.tertiary,
        borderColor: colors.white(),
        borderWidth: calculateSize(0.5),
    }

    
    
    return(

        <Fragment>
            <Card style={(colorScheme === 'dark')?darkStyle:lightStyle}>
                <Text color={(colorScheme === 'light')?colors.grey.t80:colors.white()} {...typography["title-20"]} extraStyles={{margin:10}} >{ placeholder }</Text>
                <View style={{flex:1, width:'100%', justifyContent:'center'}}>   
                    <DatePickerIOSRN
                    date={date}
                    onDateChange={onDateChange}                    
                    mode='date'
                    locale='es_AR'
                    />
                </View>    
            </Card>
            
            <Button title='Confirmar' theme='light' onPress={confirmar}/>
            <Button title='Cancelar' theme ='error' onPress={cancelar} extraStyles={{marginBottom: calculateSize(20)}}/>
        </Fragment>
    )
    
}


const openDatePickerAndroid = async (value, handleChange, confirmar, cancelar)=>{

    try {

        const {action, year, month, day} = await DatePickerAndroidRN.open({date: value});
    
        if (action !== DatePickerAndroidRN.dismissedAction) {

            handleChange(new Date(year,month,day))
            confirmar()

        }else{

            cancelar()

        }
    
    }catch ({code, message}) {
        console.warn('No se puedo abrir el selector', message);
    }

}



const DatePicker = (props)=> {


    //Destructuración de props 
    const {  name, placeholder, label} = props;
    const { values, errors, touched, handleChange, setFieldTouched } = props.formik


    //Estado interno
    const [focus, toogleFocus] = useToogle(false)
    const [modal, toogleModal] = useToogle(false)
    const [valuePicker, setValuePicker] = useState(values[name])

    //Setters
    const setPreviusValue = (valuePicker)=>{
        setValuePicker(valuePicker)
    }
    

    //Acciones
    const confirmar = ()=>{

        toogleFocus() //Pierde el foco
        setPreviusValue(values[name]);
        setFieldTouched(name);
        ios && toogleModal() //Cierro el modal

    }

    const cancelar = ()=>{

        toogleFocus() //Pierde el foco
        handleChange(name)(valuePicker)//Se vuelve al valor previo
        setFieldTouched(name);
        ios && toogleModal() //Cierro el modal

    }

    const onPressInput = ()=>{

        toogleFocus();

        if(!values[name]){
            const now = new Date()
            handleChange(name)(now)
            setPreviusValue(now)
        }
        
        if(ios){             
            toogleModal()
        }else{
            openDatePickerAndroid(values[name], handleChange(name), confirmar, cancelar);            
        }

    }


    //Estilos
    const thickness = (focus)?2:1;

    let color = colors.grey.t40;

    if(focus){
        color = colors.acento.primary
    }

    if(errors[name] && touched[name]){
        color = colors.error.primary
    }


    const styles = {

        touchable:{
            width:'100%'
        },
        container:{
            marginVertical:ui.margin
        },
        line:{
            color,
            thickness
        }

    }

    


    const dateValue = (values[name]) ? moment(values[name]).format('L') : placeholder;

    return(

        <Fragment>
        
            <TouchableWithoutFeedback onPress={onPressInput} style={styles.touchable}>

                <Group style={styles.container} >

                    <Label text={label}/>

                    <DateInput value={dateValue} placeholder={!values[name]}/>
                                
                    <Line {...styles.line} />

                    <Error error={errors[name]} touched={touched[name]}/>
                     

                </Group>               

            </TouchableWithoutFeedback>

            {(Platform.OS === 'ios') &&

                <ModalContainerAnimation  visible={modal} onPressBlur={cancelar}>                      
                    
                    {values[name] && <DatePickerIOS
                        date={values[name]}
                        onDateChange={handleChange(name)}
                        placeholder={placeholder}
                        confirmar={confirmar}
                        cancelar={cancelar}
                    />}                

                </ModalContainerAnimation>
            }

        </Fragment>

    )
    

}



export default DatePicker ;