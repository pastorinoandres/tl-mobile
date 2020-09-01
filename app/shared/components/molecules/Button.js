import React from 'react'
import { View, TouchableOpacity, Platform, ActivityIndicator } from 'react-native'
import { Text, Group } from '../atoms'
import { typography, colors, ui, calculateSize }  from '../../styles';
import { Dimensions } from 'react-native'

const { width } = Dimensions.get('window')


const BoxIcon = View;
const BoxText = View;
const shadows = (Platform.OS==='android') ? {} : ui.shadow 


export default Button = (props) => {
  

    const {

        title = 'Button title', 
        onPress = ()=>{},
        type = 'filled',
        theme = 'default',
        Icon, 
        last, 
        disabled,
        fit = false, 
        txtColor, 
        txtFont,
        bgColor,
        loading, 
        txtLoading, 
        colorLoading = colors.acento.primary,
        extraStyles = {},
        alignIcons

    } = props;

    //Declaración de variables
    let background, color, font, mode, typeProps, colorLoad
    let smartPadding = ui.padding
    
    //Mode
    if(fit){
        mode={
            flex:0,
            width:'auto'
        }            
    }else{
        mode={
            flex:1,
            width:'100%'
        }
    }

    //Temas
    switch (theme) {

        case 'light':
            background = colors.white();
            color = colors.acento.primary;
            font = typography["body-20"]            
            break;

        case 'facebook':
            background = colors.white();
            color = colors.social.facebook;
            font = typography["title-20"]
            colorLoad = colors.social.facebook;
            break; 

        case 'google':
            background = colors.white()
            color = '#757575';
            font = typography["title-20"]
            colorLoad = '#757575'
            break; 

        case 'error':
            background = colors.white();
            color = colors.error.primary
            font = typography["title-20"] 
            break;

        default:
            background = colors.acento.primary;
            color = colors.white();
            font = typography["body-20"]
            break;

    }

    colorLoad = colorLoading || colorLoad
    

    //Altero estilos según el tipo de boton.
    switch (type) {

        case 'filled':
            typeProps = {
                backgroundColor: bgColor || background,                
                ...shadows                
            }            
            color = txtColor || color   
            break;
            
        case 'outline':
            typeProps = {
                backgroundColor:'transparent',
                borderWidth: 1,
                borderColor: bgColor || background,
            }
            color = txtColor || background           
            break;

        case 'transparent':
            typeProps = {
                backgroundColor:'transparent'
            }
            color = txtColor || background               
            break;
    
        default:
            break;
    }

    //Defino la fuente en caso de ser explicita
    font = txtFont || font
    
    

    if(Icon && ((!fit) && (!loading))){                   
        smartPadding = width * 0.09661 //Aprox el 10% del ancho de la pantalla                
    }

    if(loading || (!Icon)){
        typeProps = {...typeProps, justifyContent:'center'}
    } 
    
    

    const styles = {

        touchable:{
            flexDirection: 'row',
            justifyContent: 'center'
        },
        container:{
            flexDirection: 'row',
            alignItems:'center',
            justifyContent:(alignIcons)?'flex-start':'center',
            height: calculateSize(50),
            paddingHorizontal: smartPadding,
            marginBottom:(last)?0:ui.margin,
            ...typeProps,
            ...ui.borderRadius,            
            ...mode,
            opacity: (disabled)?0.8:1,
            ...extraStyles
        },
        text:{
            marginLeft:(Icon)?ui.margin*2:0,
            marginRight:(loading)?ui.margin:0,
            textAlign:'left'
        },
        boxIcon:{            
            alignItems:'center',
            justifyContent:'flex-start',
            // backgroundColor: 'grey'
        },
        icon:{
            opacity:(disabled) ? 0.2 : 1
        },
        boxText:{ 
            justifyContent: (loading) ? 'center' : 'flex-start',
            flexDirection: 'row',            
            flex:(alignIcons)?1:0,
            // backgroundColor: 'orange'
        }   

    }

    const TextButton = ()=>(

        <BoxText style={styles.boxText}>
            <Text {...font} color={color} extraStyles={styles.text} disabled={disabled}>
                {(loading && txtLoading)? txtLoading: title}
            </Text>
            {(loading) && <ActivityIndicator color={colorLoad} size='small' />}
        </BoxText>

    )

   

      
    if(Icon){

        return (
            <TouchableOpacity onPress={onPress} style={styles.touchable} disabled={disabled} >

                <Group style={styles.container}>

                    {
                        ((!loading)) && 

                        (
                            <BoxIcon style={styles.boxIcon}>
                                <Icon size={32} extraStyles={styles.icon}/>  
                            </BoxIcon>
                        )
                    }

                    <TextButton/>

                </Group>

            </TouchableOpacity>
        )

    }else{

        return (
            <TouchableOpacity onPress={onPress} style={styles.touchable} disabled={disabled} >

                <Group style={styles.container}>

                    <TextButton/>

                </Group>

            </TouchableOpacity>
        )
    }

}


