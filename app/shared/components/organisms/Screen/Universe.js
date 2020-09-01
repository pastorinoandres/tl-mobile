
//Dependecies
import React, { Component, Fragment, Children, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Dimensions, View, Modal, Image, ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeArea, SafeAreaConsumer  } from 'react-native-safe-area-context';


//Components
import { Thumbnail, Text} from '../../atoms';
import Profile from './Profile';
import Notifications from './Notifications';
import Menu from './Menu';
import HeaderTitle  from './HeaderTitle';

//Services
import { auth } from '../../../../services/firebase';

//Actions
import { logout as action_logout } from './../../../../state/ducks/system/systemActions';

//Selectors
import { getFirebaseUser } from './../../../../state/ducks/system/systemSelectors';

//Styles
import { colors, typography, ui, calculateSize } from '../../../styles';
import {Settings, ChangeMode, ShareAction, GiveFeedback} from './../../../vectors';

const {
  Extrapolate,
  Value,
  abs,
  Clock,
  block,
  cond,
  eq,
  set,
  add,
  and,
  multiply,
  greaterThan,
  clockRunning,
  startClock,
  stopClock,
  event,
  interpolate,
  timing,
} = Animated;
const {width:windowWidth, height:windowHeight} = Dimensions.get('window');
  
  

const Universe = (props)=>{

     
    const scrollY = useRef(new Value(0)).current

    const insets = useSafeArea();
    const dispatch = useDispatch()
    const logout = ()=>dispatch(action_logout())


  
    const [ anchor, setAnchor ] = useState(windowHeight) 
    const [ heightTitle, setHeightTitle ] = useState(0) 
    

    const onScroll = event(
      [
        {
          nativeEvent: { 
            contentOffset: {
              y: scrollY
            }
          }
        }
      ],
      { useNativeDriver: true },
    )
    
    const { scrollView, options, animationValues: { translationX } } = props;
  
    const opacity = interpolate(translationX, {
      inputRange: [ -0.8*windowWidth, -0.6*windowWidth, 0],
      outputRange: [ 1, 0.2, 0],
      extrapolate: Extrapolate.CLAMP,
    });
  
    const translateX = interpolate(translationX, {
      inputRange: [ -0.8*windowWidth, 0],
      outputRange: [ 0, 0.8*windowWidth],
      extrapolate: Extrapolate.CLAMP,
    });
    
  
    //Estilos
    
    const styles = {
      container: {
        flex:1,
        width:'100%',
        alignItems:'center',
        justifyContent:'flex-start',
        paddingTop:insets.top,
        paddingBottom:0,
      },
      scrollView:{
        flex:1,
        width: 0.75 * windowWidth,
        marginLeft: 0.25 * windowWidth,
        marginTop: ui.padding,
        opacity,      
        transform: [{ translateX }]
      }
    }
  
    const gradientColor = colors.universeBackground
  
    
  
  
    return(
  
      <LinearGradient style={styles.container} {...gradientColor}>
  
        <Profile opacity={opacity}/>
    
        <Animated.View style={styles.scrollView}>
          <HeaderTitle {...{heightTitle, anchor, scrollY}}/>
          <Animated.ScrollView 
            style={{paddingRight:ui.margin}} 
            onScroll={onScroll} 
            scrollEventThrottle ={1}
            ref={scrollView}>          
            <Menu {...{options, scrollY}}/>          
            <Notifications {...{ setHeightTitle, anchor, setAnchor, scrollY, translationX}}/>
          </Animated.ScrollView>
        </Animated.View>
  
      </LinearGradient>
  
    )
  
     
}

export default Universe

