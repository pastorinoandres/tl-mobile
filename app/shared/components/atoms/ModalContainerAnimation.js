import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Modal, View, Dimensions, TouchableWithoutFeedback, Animated, Easing} from 'react-native';
import { ui } from '../../styles';
import { useAnimatedValue } from  './../../../hooks';

const { height } = Dimensions.get('window');
const { Value, timing, spring } = Animated;

const ModalContainerAnimation = ({visible, onClose = ()=>{}, onOpen = ()=>{}, onPressBlur= {}, children })=>{

    //Referencias
    const mounted = useRef() //Valor que me permite saber si ya se monto el componente
    const animation = useAnimatedValue(0)

    //Estado interno
    const [visibility, setVisibility] = useState(false)

    //Funciones de animación        
    const openModal = (onOpen)=>{
        spring(animation,{toValue: 1}).start(onOpen); 
    }
    const closeModal = (onClose)=>{       
        timing(animation,{toValue: 0}).start(onClose) 
    }

    //Efectos
    useEffect(()=>{

        
        if(!mounted.current){ 
            mounted.current = true
        }else{
            if(visible){
                setVisibility(true)               
            }else{
                closeModal(()=>{
                    setVisibility(false);
                    onClose();
                })
            }
        }


    },[visible])

    useEffect(()=>{

        visibility && openModal(onOpen)

    },[visibility])



    //Constantes de animación
    const backgroundColor = animation.interpolate({
        inputRange: [0,1],
        outputRange: ['rgba(0,0,0,0)','rgba(0,0,0,0.6)']
    })

    const opacity = animation.interpolate({
        inputRange: [0,1],
        outputRange: [0,1]
    })

    const scale =  animation.interpolate({
        inputRange: [0,1],
        outputRange: [0,1]
    })

    const translateY = animation.interpolate({
        inputRange: [0,1],
        outputRange: [height,0]
    })


    //Estilos 
    const modalStyles={

        container:{
            ...StyleSheet.absoluteFill,  
            justifyContent:'flex-end',                        
            backgroundColor,
        },
        touchable:{
            height,
        },
        card:{
            position: 'absolute',
            zIndex:100,
            width: '100%',
            padding: ui.padding,
            opacity,
            transform:[{scale},{translateY}]            
        }

    }

    
    return(

        <Modal animationType="none" transparent={true} visible={visibility}>

            <Animated.View style={modalStyles.container}>
                
                <TouchableWithoutFeedback onPress={onPressBlur}>                                
                    <View style={modalStyles.touchable}/>                               
                </TouchableWithoutFeedback>

                <Animated.View style={modalStyles.card}>
                    {children}                                
                </Animated.View> 
                
            </Animated.View>

        </Modal>

    )
    

        
    
}

export default ModalContainerAnimation;