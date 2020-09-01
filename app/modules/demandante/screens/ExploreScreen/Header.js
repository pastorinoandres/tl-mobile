import React from 'react';
import { Dimensions, TouchableWithoutFeedback } from 'react-native';
import { typography, colors, ui } from '../../../../shared/styles';
import Text from '../../../../shared/components/atoms/Text';
import Animated from 'react-native-reanimated';
import { useSafeArea  } from 'react-native-safe-area-context';


const {width:windowWidth, height:windowHeight} = Dimensions.get('window');
const { Extrapolate, interpolate, createAnimatedComponent } = Animated;

const TouchableAnimated = createAnimatedComponent(TouchableWithoutFeedback)

const Header = ({scrollY,scrollView})=>{

  const goInitial = ()=>{

    if (scrollView.current) {
      scrollView.current
        .getNode()
        .scrollTo({ y:0});
    }

  }

    const insets = useSafeArea();
    const MIDDLE_SCREEN = windowHeight/2
  
  
    const topHeader= interpolate(scrollY, {
      inputRange:[0,200,240],
      outputRange: [-(insets.top+60),-(insets.top+100),0],
      extrapolate: Extrapolate.CLAMP,
    });
  
    const opacityHeader = interpolate(scrollY, {
      inputRange:[0,200,300],
      outputRange: [0,0,1],
      extrapolate: Extrapolate.CLAMP,
    });
  
  
    const styles = {
      
      containerHeader:{
        height:insets.top+60,
        width:'100%',
        position:'absolute',
        top:topHeader,
        left:0,
        right:0,
        ...ui.shadow,
        opacity:opacityHeader
      },    
      header:{
        height:'100%',
        width: '100%',      
        justifyContent:'center',
        alignItems: 'center',
        paddingTop:insets.top,      
        backgroundColor: colors.demandantes.primary
      },
  
  
    }
  
    return(
  
      <Animated.View style={styles.containerHeader}>
        <TouchableAnimated onPress={goInitial}>
          <Animated.View style={styles.header}>
            <Text {...typography["title-20"]} color={colors.white(1)}  extraStyles={{textAlign:'center',}}> Tienda</Text>
          </Animated.View>
        </TouchableAnimated> 
      </Animated.View>
    )
  
}

export default Header;