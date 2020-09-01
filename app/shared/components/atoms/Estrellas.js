//dependecies
import React, { useEffect, useRef } from 'react';
import {Dimensions, Animated, Easing } from 'react-native';
import { Estrellas as VectorEstrella } from '../../../shared/vectors'
import { useAnimatedValue } from  './../../../hooks';

const { Value, timing } = Animated;
const { width, height } = Dimensions.get('window')

const config = {
    toValue: 1,
    duration:8000,
    easing:Easing.linear
}



const Estrellas = ()=>{

    //Referencias
    const animation = useAnimatedValue(0)
    
    //Funciones animables
    const playAnimation = ()=>{
        
        timing(animation,config)
        .start((stars)=>{

          if(stars.finished){
            animation.setValue(0)
          }
          playAnimation()

        })
    }

    //Efectos
    useEffect(playAnimation,[])

    //Constantes de animación
    const opacity= animation.interpolate({
        inputRange: [0,1],
        outputRange: [0.3,0.2],
    });
    const scale= animation.interpolate({
        inputRange: [0,1],
        outputRange: [1,0.7],
    }); 
    const translateY = animation.interpolate({
        inputRange: [0,1],
        outputRange: [(-height),0],
    });
    const translateX = animation.interpolate({
        inputRange: [0,1],
        outputRange: [0,-(width)],
    });

    //Estilos
    const starStyles = {
        backgroundColor:'transparent', 
        opacity,
        position:'absolute',
        width:width*2,
        height:height*2, 
        top:0,
        left:0, 
        transform:[{scale},{translateY},{translateX}]
    }

    return(
        <Animated.View style={starStyles}>
            <VectorEstrella size={width*2}/>
        </Animated.View>
    )

}


export default Estrellas;