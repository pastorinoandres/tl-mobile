import React, { useEffect, useRef } from 'react';
import { Keyboard, Animated, Easing } from 'react-native';
import { ui } from '../../../shared/styles';
import { useAnimatedValue, useKeywordListeners } from '../../../hooks'


const FormButtons = ({ showButton, height = 30, children})=>{
  
    const animation = useAnimatedValue(0)
    const mounted = useRef()


    const hideButtonAnimation = ()=> {
        Animated.timing(animation,{
            toValue:1,
            duration:100
        }).start()
      }

    const showButtonAnimation = ()=> {
        Animated.timing(animation,{
            toValue:0,
            duration:100
        }).start()
      }



    useKeywordListeners(hideButtonAnimation,showButtonAnimation)

    useEffect(()=>{

        if(!mounted.current){

            mounted.current = true

        }else{

            if(showButton){
                showButtonAnimation()
            }else{
                hideButtonAnimation()
            }
        }

    },[showButton])

    const styles= {

        opacity: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
        }),
        height: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [height, 0],
        }),

    }



    return (

        <Animated.View style={styles}>
            {children}            
        </Animated.View> 
    );

    
}


export default FormButtons;