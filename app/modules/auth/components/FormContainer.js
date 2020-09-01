import React, { useEffect } from 'react';
import { Dimensions, Animated, Easing } from 'react-native';
import { ui } from '../../../shared/styles';
import { useAnimatedValue, useKeywordListeners } from '../../../hooks'

const { width } = Dimensions.get('window');


const FormContainer = ({children}) => {

    const transition = useAnimatedValue(0)

    //Efectos
    useEffect(()=>{

        Animated.timing(transition,{
            toValue:1,
            easing: Easing.inOut(Easing.ease)
        }).start()

    },[])


    //Constantes de animación
    const opacity = transition.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });
        
    const translateX = transition.interpolate({
        inputRange: [0, 1],
        outputRange: [-width, 0],
    });

    const rotate= transition.interpolate({
        inputRange: [0, 1],
        outputRange: ['20deg','0deg'],
    });

    
    //Estilos
    const styles = {
        flex:1,
        width:'100%',
        justifyContent: 'center',
        paddingHorizontal:ui.padding,
        transform:[{translateX},{rotate}],
        opacity,
    }
    
    return (
        
            <Animated.View style={styles}>
                {children}
            </Animated.View >
    )             
        
    
}

export default React.memo(FormContainer);

