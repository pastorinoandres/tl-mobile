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
    concat
} = Animated;

const Proyectos = ()=>{

  const opacity = useRef(new Animated.Value(0)).current
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
      overflow:'hidden',
      height:260,
      backgroundColor: colors.white(1),
      ...ui.borderRadius,
      padding:ui.padding,
      transform:[{scale}]
    },
    itemsGroup:{
      flex:1,
      opacity
    },
    item:{
      width:'100%'
    },
    progressBar:{
      flexDirection:'row',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom:ui.margin
    },
    bar:{
      width:100,
      height:12,
      borderRadius:6,
      overflow: 'hidden',
      backgroundColor: colors.grey.t20,
    },
    indicator:(done,task)=>({
      width:(100*done)/task,
      height:12,
      borderRadius:6,
      overflow: 'hidden',
      backgroundColor: colors.demandantes.primary
    })
    
  }

  const projects = [
    {
      name: 'TuLaburo',
      task:18,
      done:12
    },
    {
      name: 'Mi casa',
      task:12,
      done:4
    },
    {
      name: 'Empresa',
      task:6,
      done:1
    }
  ]

  return(
    <Animated.View style={styles.container}>
      <Text {...typography["title-20"]} color={colors.grey.t80} extraStyles={{textAlign:'left',marginBottom:30, width:'100%'}}>Proyectos</Text>
      <Animated.View style={styles.itemsGroup}>
        {
          projects.map((project,index) =>{
            return(
              <View style={styles.item} key={`${index}-${project.name}`}>
                <Text {...typography["body-14"]} color={colors.grey.t80} extraStyles={{textAlign:'left',marginBottom:5}}>{project.name}</Text>
                <View style={styles.progressBar}>
                  <View style={styles.bar}>
                    <View style={styles.indicator(project.done,project.task)}/>
                  </View>
                  <Text {...typography["body-14"]} color={colors.grey.t60} extraStyles={{textAlign:'left',paddingLeft:10}}>{`${project.done}/${project.task}`}</Text>
                </View>
              </View>
            )
          })
        }
      </Animated.View>
    </Animated.View>
  )

}

export default Proyectos;
