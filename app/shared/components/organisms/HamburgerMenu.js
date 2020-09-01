import React, {useContext} from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import { colors } from '../../../shared/styles';
import { AnimationSync } from './../../../animations';
import Animated from 'react-native-reanimated';

const {width:windowWidth, height:windowHeight} = Dimensions.get('window');
const {
    Extrapolate,
    interpolate,
    concat
} = Animated;


const HamburgerMenu = ({style, animatedColor})=>{

  const swipeMenu = useContext(AnimationSync);  
  const{ toogleMenu, tX } = swipeMenu;
  

  const translateY = interpolate(tX, {
    inputRange: [ -0.8*windowWidth, 0],
    outputRange: [ -38, 0 ],
    extrapolate: Extrapolate.CLAMP,
  });


  const widthArrow = (initial,size) => interpolate(tX, {
    inputRange: [ -0.8*windowWidth, 0],
    outputRange: [ (size==='big') ? 25 : 14, initial],
    extrapolate: Extrapolate.CLAMP,
  });

  const positionLeftArrow = (index, initial) => interpolate(tX, {
    inputRange: [ -0.8*windowWidth, 0],
    outputRange: [ (index === 2) ? 1 : 0, initial],
    extrapolate: Extrapolate.CLAMP,
  });

  const positionTopArrow = (index,initial) => interpolate(tX, {
    inputRange: [ -0.8*windowWidth, 0],
    outputRange: [ (index === 1) ? initial+3.5 : (index ===2) ? initial : initial-3.5, initial],
    extrapolate: Extrapolate.CLAMP,
  });

  const rotateArrow= (index) => concat(interpolate(tX, {
    inputRange: [ -0.8*windowWidth, 0],
    outputRange: [(index === 1) ? -45 : (index ===2) ? 0 : 45 ,0],    
    extrapolate: Extrapolate.CLAMP,
  }), "deg")


  const notificationSize = interpolate(tX, {
    inputRange: [ -0.8*windowWidth, 0],
    outputRange: [ 0, 14 ],
    extrapolate: Extrapolate.CLAMP,
  });

  const opacity = interpolate(tX, {
    inputRange: [ -0.8*windowWidth,-1, 0],
    outputRange: [ 0, 0.1,1 ],
    extrapolate: Extrapolate.CLAMP,
  });


  const styles = {
    container:{
      height:60,
      width:60,
      backgroundColor:'transparent',
      alignItems: 'flex-end',
      justifyContent: 'center',
      transform:[{translateY}],
    },
    lineFormat:{
      backgroundColor: animatedColor || colors.demandantes.primary,
      height:3.5,
      borderRadius:1.5,      
      position:'absolute',
    },
    line1:{    
      width: widthArrow(26,'short'),
      top: positionTopArrow(1,0),
      left: positionLeftArrow(1,0),
      transform:[{rotate: rotateArrow(1)}],
      
    },
    line2:{      
      width: widthArrow(20,'big'),
      top: positionTopArrow(2,8.5),
      left: positionLeftArrow(2,6),
      transform:[{rotate:rotateArrow(2)}],
    },
    line3:{
      width: widthArrow(14,'short'),
      top: positionTopArrow(3,17),
      left: positionLeftArrow(3,12),      
      transform:[{rotate:rotateArrow(3)}],
    },
    box:{
      width:26,
      height: 25.5
    }
    
  }

  return(
    <Animated.View style={style}>
      <TouchableOpacity onPress={toogleMenu}>
        <Animated.View style={styles.container}>
          <View style={styles.box}>
            <Animated.View style={[styles.line1,styles.lineFormat]}/>
            <Animated.View style={[styles.line2,styles.lineFormat]}/>
            <Animated.View style={[styles.line3,styles.lineFormat]}/>
          </View>
            <Animated.View style={{opacity, height:notificationSize,width:notificationSize,backgroundColor:colors.error.primary,borderRadius:7,position:'absolute',top:10, right:-3.5, justifyContent:'center',alignItems:'center'}}>
            </Animated.View>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
    
  )
}


export default HamburgerMenu;