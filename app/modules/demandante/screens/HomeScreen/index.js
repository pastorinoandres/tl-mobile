import React, { useContext, useRef, useState, useEffect } from 'react';
import { View, Dimensions, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { typography, colors, ui, calculateSize } from '../../../../shared/styles';
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
import MainHeader from './MainHeader';
import NextEvents from './NextEvents';
import Pedidos from './Pedidos';
import Proyectos from './Proyectos';
import Store from './../../../../shared/vectors/store';
import Gastos from './Gastos'


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
    concat
} = Animated;




const HomeScreen = (props) => {

  const [ isReady, setIsReady ] = useState(false)
  
  useEffect(()=>{

    setTimeout(()=>setIsReady(true),3500)
  },[])

  const { login, logout } = useActions( 'login', 'logout' )

  const options = [
    {
      name:'Cambiar al  modo trabajador',
      Icon:ChangeMode,
      action:()=>Alert.alert('hiciste click en la option')
    },
    {
      name:'Configuración de la app',
      Icon:Settings,
      action:()=>Alert.alert('hiciste click en la option')
    },
    //{
      //name:'Cerrar sessión',
      //Icon:SignOut,
      //action: ()=>logout()
    //},    
    // {
    //   name:'Danos tu opinion',
    //   Icon:GiveFeedback, 
    //   action:()=>Alert.alert('hiciste click en la option')
    // }, 

  ]

  const insets = useSafeArea();

  const styles={

    container:{
      flex:1, 
      width: '100%', 
      justifyContent:'flex-start',
      backgroundColor:'colors.backgroundGrey.primary'
    },
    space:{
      height:210,
      width:'100%'
    },
    spaceInitial:{
      height: 70 + insets.top + ui.margin + ui.padding + calculateSize(50) + ui.padding
    }
  }

  const scrollView = useRef(null);

  const scrollY = useRef(new Value(0)).current

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


    
  return (

    <Screen {...props} options={options} initialAnimation>
      <View style={styles.container}> 
        <Animated.ScrollView
          onScroll={onScroll} 
          scrollEventThrottle ={1}
          ref={scrollView}>
          <View style={styles.spaceInitial}/>          
            <NextEvents/>          
            <Group/>
            <Gastos/>
          <View style={styles.space}/>
        </Animated.ScrollView>
        <MainHeader {...{scrollY,scrollView}} navigate={props.navigation.navigate}/>   
      </View>
    </Screen>

  )
  
  
  
}

export default HomeScreen;


const Group = ()=>{
   return(
     <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: ui.padding,marginTop:ui.padding}}>
      <Pedidos/>
      <Proyectos/>
     </View>
   )
}

const Skeleton = (props)=>{

  const styles={

    container:{
      flex:1, 
      width: '100%', 
      justifyContent:'flex-start',
      backgroundColor:'colors.backgroundGrey.primary'
    }
  }

  return(

    <Screen {...props} >
      <View style={styles.container}>
      </View>
    </Screen>

  )

}
