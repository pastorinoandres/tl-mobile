//Dependecies
import React from 'react';
import { Dimensions, View } from 'react-native';

//Components
import { Text } from '../../atoms';

//Styles
import { colors, typography, ui, calculateSize } from '../../../styles';
import {Settings, ChangeMode, ShareAction, GiveFeedback} from './../../../vectors';
import Animated  from 'react-native-reanimated';


const { Extrapolate, interpolate, createAnimatedComponent } = Animated;
const {width:windowWidth, height:windowHeight} = Dimensions.get('window');

const HeaderTitle = ({heightTitle, anchor, scrollY}) =>{

  const size =  ui.padding*0.5 + heightTitle + anchor

  const translateY1 = interpolate(scrollY, {
    inputRange: [ anchor-ui.margin*3, anchor],
    outputRange: [ 0, -50],
    extrapolate: Extrapolate.CLAMP,
  });

  const translateY2 = interpolate(scrollY, {
    inputRange: [ 0, size],
    outputRange: [ size, 0],
    extrapolateRight: Extrapolate.CLAMP,
  });

  const opacity1 = interpolate(translateY1, {
    inputRange: [ -50, -25, 0],
    outputRange: [ 0, 0.1, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  
  
  
  const styles = {

    container:{
      marginTop:ui.padding,
      marginBottom: ui.padding*0.5,
    },
    title1:{ 
      textAlign: 'left',
      transform:[{translateY:translateY1}],
      opacity:opacity1,
    },
    title2:{ 
      textAlign: 'left',
      transform:[{translateY:translateY2}],
      opacity:1,      
      position:'absolute',
      top:0,
      zIndex:20
    }
  }


    return(
      <View style={styles.container}>
        <Text {...typography["title-20"]} color={colors.white()} extraStyles={styles.title1} animated>{'Menu sugerido'}</Text>      
        <Text {...typography["title-20"]} color={colors.white()} extraStyles={styles.title2} animated>{`Notificaciones`}</Text>
      </View>
    ) 
  
}

export default HeaderTitle;
