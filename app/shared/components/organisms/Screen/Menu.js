
//Dependecies
import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Alert } from 'react-native';
import Animated from 'react-native-reanimated';

//Components
import { Text} from '../../atoms';

//Styles
import { colors, typography, ui, calculateSize } from '../../../styles';


const {
    Extrapolate,
    interpolate,
    createAnimatedComponent
} = Animated;



const Menu = ({options = [], scrollY})=>{

    const [ heightItem, setHeightItem] = useState(40)

    const calculateOpacity = (index)=>{

      return interpolate(scrollY, {
        inputRange: [ heightItem*(index), heightItem*(index)+heightItem/2, heightItem*(index+1)],
        outputRange: [ 1, 0.2, 0 ],
        extrapolate: Extrapolate.CLAMP,
      });
  
    }
    const styles = {

      mainWrapper:{ 
        width: '100%', 
        marginBottom: ui.margin*2,
        paddingTop:ui.margin
      },
      container:{        
        paddingVertical: ui.padding,        
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'center', 
      },
      touchable:(index)=>({        
        opacity:calculateOpacity(index),
      }),
      icon:{
        marginRight:ui.padding
      },
      text:{ 
        textAlign: 'left'
      }
    }

    const onLayout = ({nativeEvent: { layout: {height}}})=>{
      
      setHeightItem(height)

    }

    const TouchableWithoutFeedbackAnimated = createAnimatedComponent(TouchableWithoutFeedback)
  
    return (
  
      <View style = {styles.mainWrapper}>
  

        {options.map( (Option,index) => (
          <TouchableWithoutFeedbackAnimated 
            key={index} 
            style={styles.touchable(index)} 
            onLayout={(info)=>onLayout(info,index)}
            onPress={Option.action}
          >
            <Animated.View  style={styles.container} >
              <Option.Icon size={25} color={colors.white()} extraStyles={styles.icon}/>
              <Text {...typography["body-16"]} color={'white'} extraStyles={styles.text} >{Option.name}</Text>
            </Animated.View>
          </TouchableWithoutFeedbackAnimated>
        ))}
  
      </View>
  
    )
  
}

export default Menu;
  