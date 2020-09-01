import React from 'react';
import { Dimensions } from 'react-native';
import { typography, colors, ui } from '../../../../shared/styles';
import Text from '../../../../shared/components/atoms/Text';
import Animated from 'react-native-reanimated';


const {width:windowWidth, height:windowHeight} = Dimensions.get('window');
const { Extrapolate, interpolate } = Animated;

const H1 = ({scrollY})=>{

    const TOP_SEARCH_BOX = 240
    const TOP_H1 = TOP_SEARCH_BOX -50 
  
    const topH1 = interpolate(scrollY, {  
      inputRange: [0,TOP_H1+100],
      outputRange: [TOP_H1,-100],
      extrapolateLeft: Extrapolate.CLAMP,
    }); 
    
    const opacityH1 = interpolate(scrollY, {  
      inputRange: [0,TOP_H1/1.2],
      outputRange: [1,0],
      extrapolateRight: Extrapolate.CLAMP,
    }); 
  
    const styles={
      
      h1:{
        position:'absolute', 
        top:topH1,
        width: '100%',
        paddingHorizontal:ui.padding,
        alignItems: 'center',
        opacity:opacityH1
      },
  
    }
  
  
    return(
      <Animated.View style={styles.h1}>
        <Text {...typography["title-24"]} color={colors.demandantes.tertiary}  extraStyles={{textAlign:'center'}}> ¿Qué andas buscando?</Text>
      </Animated.View>
    )
  }
  

export default H1;