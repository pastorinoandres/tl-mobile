

import React, { useState, Fragment } from 'react';
import { Platform, Picker as PickerRN, FlatList, View, TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { colors, typography, ui, calculateSize } from '../../styles';
import { Text, Card, Line, Group, ModalContainerAnimation } from '../atoms';
import { Button, InputLabel as Label, InputError as Error } from '../molecules';
import { useToogle } from  './../../../hooks';
import { useColorScheme } from 'react-native-appearance';


const Picker = (props)=>{

    //Destructuración de props 
    const {  name, placeholder, label, items} = props;
    const { values, errors, touched, handleChange, setFieldTouched } = props.formik
    
    //Estado interno
    const [focus, toogleFocus] = useToogle(false)
    const [modal, toogleModal] = useToogle(false)
    const [valuePicker, setPreviusValue] = useState(values[name])

    
    const onPressInput = ()=>{        
        toogleFocus();
        toogleModal()
    }

    const confirmar = ()=>{

        toogleFocus()
        
        if(values[name]){
            setPreviusValue(values[name]);
        }else{
            handleChange(name)(items[0])
            setPreviusValue(items[0])
        }
        
        setFieldTouched(name);
        toogleModal() //Cierro el modal

    }

    const cancelar = ()=>{

        toogleFocus()
        handleChange(name)(valuePicker)//Se vuelve al valor previo
        setFieldTouched(name);
        toogleModal() //Cierro el modal

    }

    //Lógica de estilos
    const thickness = (focus)?2:1;

    let color = colors.grey.t40;

    if(focus){
        color = colors.acento.primary
    }

    if(errors[name] && touched[name]){
        color = colors.error.primary
    }

    //Estilos
    const styles = {

        touchable:{
            width:'100%'
        },
        input:{
            flexDirection: 'row',
            flex:1,
            paddingHorizontal: calculateSize(2)
        },
        container:{
            marginVertical:ui.margin
        },
        line:{
            color,
            thickness
        },
        text:{
            height:calculateSize(40),
            flex:1,
            textAlign:'left'
        }

    }
        

    return(

        <Fragment>
        
            <TouchableWithoutFeedback onPress={onPressInput} style={styles.touchable}>
                <Group style={styles.container} >
                <Label text={label}/>

                    <Group  style={styles.input}>             
                        <Text {
                            ...typography["body-18"]} 
                            color={(values[name])?colors.grey.t80:colors.grey.t40} 
                            extraStyles={styles.text}>
                            { values[name] || placeholder  }
                        </Text>
                    </Group>
                                
                    <Line {...styles.line}/>

                    <Error error={errors[name]} touched={touched[name]}/> 

                </Group>               

            </TouchableWithoutFeedback>

            <ModalContainerAnimation                   
                visible={modal}
                onPressBlur={cancelar}
                >  
                
                

                {(Platform.OS === 'ios')?
                    (<PickerIOS
                        selectedValue={values[name]}
                        onValueChange={handleChange(name)}
                        placeholder={placeholder}
                        items={items}
                        confirmar={confirmar}
                        cancelar={cancelar}
                        />)
                    :
                    (<PickerAndroid
                        selectedValue={values[name]}
                        onValueChange={handleChange(name)}
                        placeholder={placeholder}
                        items={items}
                        confirmar={confirmar}
                        />
                    )
                }

            </ModalContainerAnimation>

        </Fragment>

    )


}

export default Picker;











const PickerIOS = ({ onValueChange, selectedValue, placeholder, items, confirmar, cancelar })=>{

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
    
    const itemStyle = {...typography["body-20"].typography, color:(colorScheme === 'light')?colors.grey.t80:colors.white()}

    return(

        <Fragment>
            <Card style={(colorScheme === 'dark')?darkStyle:lightStyle}>
                <Text color={(colorScheme==='light')?colors.grey.t80:colors.white()} {...typography["title-20"]} extraStyles={{margin:10}} >{ placeholder }</Text>
                    <PickerRN
                        selectedValue={selectedValue}
                        style={{ width: '100%'}}
                        onValueChange={onValueChange}
                        itemStyle={itemStyle}>
                        {items.map((e)=>{
                            return (<PickerRN.Item label={e} value={e} key={e} />)
                        })}
                    </PickerRN>
            </Card>
            
            <Button title='Confirmar' theme='light' onPress={confirmar}/>
            <Button title='Cancelar' theme='error' onPress={cancelar} extraStyles={{marginBottom: calculateSize(20)}}/>
        </Fragment>
    )
    

}

const PickerAndroid = ({ onValueChange, selectedValue, placeholder, items, confirmar })=>{


    const sizeOptions = items.length
    const headerCard = calculateSize(100);
    const sizeItem = calculateSize(50);

    const totalSpace = (sizeOptions>5?calculateSize(500):(headerCard + sizeItem*sizeOptions))
    return(


        <Card style={{ marginBottom:ui.margin, justifyContent: 'space-around' }} height={totalSpace}>
        
            <Text {...typography["title-20"]} extraStyles={{margin:calculateSize(10)}} >{ placeholder }</Text>

            <View style={{flex:1, width:'100%', justifyContent:'center'}}>                        
                <FlatList
                    data={items}
                    renderItem={({item, index}) => (
                        <ItemPickerAndroid
                            item={item}
                            onValueChange={onValueChange}
                            confirmar={confirmar}
                            selectedValue={selectedValue}
                        />
                         
                    )}                        
                    keyExtractor={(item,index) => `${index}-${index}`}
                    ItemSeparatorComponent={() => (<Line color={colors.grey.t20}/>)}
                    getItemLayout={(data, index) => ({length: 50, offset: calculateSize(50) * index, index})}                    
                    initialScrollIndex={items.findIndex(e=>e===selectedValue)-2}
                />
            </View>

        </Card>

    )
    
    
}



const  ItemPickerAndroid = ({ item, onValueChange, confirmar, selectedValue })=>{

    
    let font, textColor;

    const selected = item === selectedValue;

    if(selected){
        font = typography["title-20"];
        textColor = colors.grey.t80;
    }else{
        font = typography["body-20"];
        textColor = colors.acento.primary;
    }
    
    
    const styles = {

        touchable:{
            flexDirection: 'row',
            justifyContent: 'center'
        },
        container:{
            flexDirection: 'row',
            alignItems:'center',
            justifyContent:'center',
            flex:1,
            width:'100%',
            height: calculateSize(50),
            paddingHorizontal: ui.padding,
            marginBottom:0,
            backgroundColor:'transparent',
            ...ui.borderRadius,            
        }       

    }

    return(            
        <TouchableOpacity 
            onPress={()=>{
                onValueChange(item);
                confirmar();
            }} 
            style={styles.touchable} >
            <Group style={styles.container}>                
                <Text {...font} color={textColor}>{item}</Text>    
            </Group>                    
        </TouchableOpacity>
    )

    

}