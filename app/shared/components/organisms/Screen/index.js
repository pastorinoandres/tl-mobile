
//Dependecies
import React, { Component, useContext, useRef, useEffect } from 'react';
import { Dimensions, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated, { Easing, useCode, timing } from 'react-native-reanimated';
import { PanGestureHandler, State  } from "react-native-gesture-handler";
import { useSafeArea  } from 'react-native-safe-area-context';

//Components
import Universe from './Universe';

//Styles
import { colors, typography, ui, calculateSize } from '../../../styles';
import { AnimationSync } from './../../../../animations';


const {width:windowWidth, height:windowHeight} = Dimensions.get('window');
const {
    Extrapolate,
    call,
    block,
    cond,
    eq,
    interpolate,
} = Animated;


export default Screen = (props)=>{

  const insets = useSafeArea();
  const swipeMenu = useContext(AnimationSync);
  const scrollView = useRef(null);
  
  const{ onGestureEvent, tX:translationX, menu, toogleMenu } = swipeMenu;
  const profile = 56 + ui.margin*2

  const { options } = props;

  const translateX = interpolate(translationX, {
    inputRange: [ -0.8*windowWidth, 0],
    outputRange: [ -0.8*windowWidth, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  
  const translateY = interpolate(translateX, {
    inputRange: [ -0.8*windowWidth, 0],
    outputRange: [ insets.top + profile + ui.padding, 0 ],
    extrapolate: Extrapolate.CLAMP,
  });

  const radius = interpolate(translateX, {
    inputRange: [ -0.8*windowWidth, 0],
    outputRange: [ 25, 0 ],
    extrapolate: Extrapolate.CLAMP,
  });

  const opacityScreen = interpolate(translateX, {
    inputRange: [ -0.8*windowWidth, 0],
    outputRange: [ 0.6, 1 ],
    extrapolate: Extrapolate.CLAMP,
  });

  useCode(
    () =>
      block(
        cond(
          eq(translationX,0),
          call([],([])=>{
            
            if (scrollView.current) {
              scrollView.current
                .getNode()
                .scrollTo({ y:0});
            }
          })
        )
    ), [] 
  )


  const widthTouchable = interpolate(translationX, {
    inputRange: [ -0.8*windowWidth, 0],
    outputRange: [ 0.2*windowWidth, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const styles = {

    container:{ 
      width: windowWidth, 
      height:windowHeight,      
      position: 'absolute',
      overflow: 'hidden', 
      opacity: opacityScreen, 
      right: 0 , 
      top: 0, 
      borderRadius: radius,
      transform: [{ translateY, translateX }]
    },
    screen:{ 
      backgroundColor: colors.backgroundGrey.primary,      
      width: windowWidth, 
      height:windowHeight,
      justifyContent: 'center',
      alignItems: 'center'
    },
    touchable:{
      width: widthTouchable,
      height:windowHeight,
      position: 'absolute',
      top:0,
      right:0

    }

  }

  return(
    <>
      <Universe {...{scrollView, options}} animationValues={{translationX}}/>
      <PanGestureHandler
        onHandlerStateChange={onGestureEvent}
        {...{ onGestureEvent }}>
        <Animated.View style={styles.container}>          
          <View style={styles.screen}>
            {props.children}
          </View>
          <TouchableWithoutFeedback onPress={toogleMenu}>
            <Animated.View style={styles.touchable}/>
          </TouchableWithoutFeedback>
        </Animated.View>
      </PanGestureHandler>
    </> 
  )

}


