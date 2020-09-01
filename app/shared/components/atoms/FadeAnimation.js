import React, { useEffect, useRef } from 'react';
import { useAnimatedValue } from  './../../../hooks';
import { Animated, Easing } from 'react-native' 

const { timing, spring } = Animated;
const defaultConfig =  { toValue: 1, duration:2000, delay:2000}


const getTransformArray = (transformValues,animation)=>{

    let transform = [];

    transformValues.forEach(transformation => {

        transform.push(

            {
                [transformation.name]:animation.interpolate({
                    inputRange: [0,1],
                    outputRange: transformation.outputRange,
                })
            }
        )
        
    });

    return transform;

}


/*

transformValues:
Es un arreglo con todas las transformaciónes animadas que se le quiere agregar al grupo. Cada transformación es un objecto que contiene:
@name: El nombre de la transformación a usar y,
@outputRange : Un arreglo con dos posiciones ( initialValue y finalValue ).

animationType: 
Un string que puede ser 'timing' o 'spring'

config: 
Un objeto con las configuraciones de la animación ( Varia según el animationType )

extraStyles: 
Un objeto con los estilos adicional que se le quiera dar al contenedor.

*/

const FadeAnimation = ({ children, transformValues=[], animationType = 'timing',  config = defaultConfig,  extraStyles = {} })=>{

    //Referencias
    const animation = useAnimatedValue(0)


    //Efectos
    useEffect(()=>{
        
        switch (animationType) {
            case 'timing':
                timing(animation, config).start()  
                break;
            case 'spring':
                spring(animation, config).start()   
                break;
        
            default:
                break;
        }

    }, [])

    
    //Constantes de animación
    const transform = getTransformArray(transformValues,animation)

    const opacity= animation.interpolate({
        inputRange: [0,1],
        outputRange: [0,1],
    });

    //Estilos
    const fadeStyles = {
        ...extraStyles, 
        opacity, 
        transform 
    }
    

    return (
        <Animated.View style={fadeStyles}>
            {children}
        </Animated.View>
    );
    
}


export default FadeAnimation;