import React, {useContext, useRef, useEffect} from 'react';
import { View, Dimensions, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { typography, colors, ui } from '../../../../shared/styles';
import Text from '../../../../shared/components/atoms/Text';
import { Screen } from '../../../../shared/components/organisms';
import { Button } from '../../../../shared/components/molecules';
import { AnimationSync } from '../../../../animations';
import Animated, { Easing } from 'react-native-reanimated';
import { useSafeArea  } from 'react-native-safe-area-context';
import { HamburgerMenu } from '../../../../shared/components/organisms';
import {Settings, ChangeMode, ShareAction, GiveFeedback, SignOut, Pedidos as PedidosIcon} from '../../../../shared/vectors';
import useActions from '../../../../hooks/useActions';
import { LinearGradient } from 'expo-linear-gradient';
import { Thumbnail } from '../../../../shared/components/atoms';

const {width:windowWidth, height:windowHeight} = Dimensions.get('window');
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
    or,
    multiply,
    greaterThan,
    clockRunning,
    startClock,
    stopClock,
    event,
    interpolate,
    timing,
    debug,
    concat,
    createAnimatedComponent
} = Animated;


const GradientBox = createAnimatedComponent(LinearGradient)

const Pedidos = ()=>{

  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current

  useEffect(()=>{

    Animated.timing(
      opacity,
        {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
        },
    ).start();
    
    Animated.timing(
      scale,
        {
          toValue: 1,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
        },
    ).start();

    

  },[])

  const styles = {
    container:{
      width:(windowWidth-(ui.padding*3))/2,
      height:260,
      ...ui.borderRadius,
      shadowColor: colors.demandantes.primary,
      shadowOffset: {
          width: 0,
          height: 5
      },
      shadowOpacity: 0.6,
      shadowRadius: 10,
      elevation: 5,
      transform:[{scale}]
    },
    gradient:{
      flex:1,
      overflow:'hidden', 
      ...ui.borderRadius, 
      justifyContent: 'space-between',
      alignItems: 'center',
      padding:ui.padding/2,
      paddingTop:ui.padding,
      opacity   
    },
    preview:{
      width:'100%',
      height:90,
      backgroundColor:colors.white(0.5),
      ...ui.borderRadius,
      marginTop:ui.margin,
      justifyContent:'space-around',
      
    },
    indicatorScroll:{
      width:'100%',
      height: 4,
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    circle:{
      width:4,
      height:4,
      borderRadius:2,
      backgroundColor:colors.white(1),
      marginRight:4
    },
    line:{
      width:16,
      height:4,
      borderRadius:2,
      backgroundColor:colors.white(1),
    }
    
  }

  const solicitudes = [

    {
      request:2,
      name: 'Corte de pasto'
    },
    {
      request:4,
      name: 'Cambio de cuerito'
    },
    {
      request:1,
      name: 'Campaña de marketing'
    }

  ]

  return(
    <Animated.View style={styles.container}>
      <GradientBox style={styles.gradient} {...colors.demandanteGradient}>
        <Text {...typography["title-20"]} color={colors.white(1)} extraStyles={{textAlign:'left', width:'100%',paddingLeft:ui.padding/2}}>Tus pedidos</Text>
        <PedidosIcon size={80}/>
        <View style={styles.preview}>
          <Text {...typography["body-strong-18"]} color={colors.white(1)} extraStyles={{textAlign:'center'}}>{solicitudes[0].name}</Text>
          <Text {...typography["body-strong-14"]} color={colors.white(1)} extraStyles={{textAlign:'center'}}>{` ${solicitudes[0].request} SOLICITUDES`}</Text>
          <View style={styles.indicatorScroll}>
            <View style={styles.circle}></View>
            <View style={styles.circle}></View>
            <View style={styles.line}></View>
          </View>
        </View>
        
      </GradientBox>
    </Animated.View>
    
  )

}


export default Pedidos;