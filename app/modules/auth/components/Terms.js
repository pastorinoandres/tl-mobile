import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, IconTouchable } from '../../../shared/components/atoms'
import { typography, colors, ui, calculateSize } from '../../../shared/styles';
import * as WebBrowser from 'expo-web-browser'
import { Terms as Check } from '../../../shared/vectors'

const url = 'https://tulaburo.com';

const termsColors = {

    allow:{
        whiteTransparentText: colors.white(0.8),
        whiteTransparentView: colors.white(0.2),
        whiteTransparentBorder: colors.white(0.3),
    },
    denied:{
        redText: colors.error.primary,
        whiteOpaqueView: colors.white(0.9),
        redBorder: colors.error.secondary,
    }

}

const Terminos = ({value})=>{

    const textColor = (value)? termsColors.allow.whiteTransparentText : termsColors.denied.redText 

    return(

    <TouchableOpacity onPress={()=>{WebBrowser.openBrowserAsync(url)}}>
        <Text {...typography["body-14"]} color={textColor} underline>
            Términos y condiciones
        </Text>
    </TouchableOpacity>
)}

const Politica = ({value})=>{

    const textColor = (value)? termsColors.allow.whiteTransparentText : termsColors.denied.redText 
    
    return(

    <TouchableOpacity onPress={()=>{WebBrowser.openBrowserAsync(url)}}>
        <Text {...typography["body-14"]} color={textColor} underline>
           Politica de privacidad
        </Text>
    </TouchableOpacity>
)}


const Terms = ({ onChange, value })=>{

    //Lógica de estilos
    const textColor = (value)? termsColors.allow.whiteTransparentText : termsColors.denied.redText
    const viewColor = (value)? termsColors.allow.whiteTransparentView : termsColors.denied.whiteOpaqueView 
    const borderColor = (value)? termsColors.allow.whiteTransparentBorder : termsColors.denied.redBorder  

    //Estilos
    const styles = {

        container:{
            flexDirection:'row',                
            paddingRight: calculateSize(25),
            alignItems: 'center',
            backgroundColor: viewColor,
            borderWidth: calculateSize(0.5),
            borderColor: borderColor,
            borderRadius: calculateSize(25),
        },
        line:{
            flexDirection:'row',
        },
        text:{
            flexDirection:'column',
        }
    }

    return (

        <View style={styles.container}>

            <IconTouchable Icon={()=><Check check={value} size={calculateSize(30)}/>}  area={calculateSize(80)} onPress={()=>onChange()}/>
            

            <View style={styles.text}>

                <View style={styles.line}>
                    <Text {...typography["body-14"]} color={textColor}> Acepto los </Text>  
                    <Terminos value={value}/> 
                </View>

                <View style={styles.line}>
                    <Text {...typography["body-14"]} color={textColor}> y la </Text>  
                    <Politica value={value}/>
                </View>
                
            </View>

        </View>
    );
    
    
}


export default Terms;