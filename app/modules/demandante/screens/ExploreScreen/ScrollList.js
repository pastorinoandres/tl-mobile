import React from 'react';
import { View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Animated from 'react-native-reanimated';

import NuestrasSugerencias from './NuestrasSugerencias';
import NuevosProyectos from './NuevosProyectos';
import TrabajadoresDelMes from './TrabajadoresDelMes';
import Categorias from './Categorias';
import Covid from './Covid';

const { event } = Animated;


const ScrollList = ({scrollY,scrollView})=>{

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
  
    const styles = {
  
      space:{
        height:210,
        width:'100%'
      },
      spaceInitial:{
        height: 350
      },
  
    }
  
    return(
        <Animated.ScrollView onScroll={onScroll} scrollEventThrottle ={1} ref={scrollView}>
  
        <View style={styles.spaceInitial}/>
        <Covid/>
        <NuestrasSugerencias/>
        <NuevosProyectos/>
        <TrabajadoresDelMes/>
        <Categorias/>     
        <View style={styles.space}/>
  
      </Animated.ScrollView>
    )
  
}

export default ScrollList;