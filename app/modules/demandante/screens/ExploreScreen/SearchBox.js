import React, { useRef, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { typography, colors, ui, calculateSize } from '../../../../shared/styles';
import Text from '../../../../shared/components/atoms/Text';
import Animated, { Easing } from 'react-native-reanimated';
import { useSafeArea  } from 'react-native-safe-area-context';
import {Search} from '../../../../shared/vectors';
import interpolateWithEasing, { easeOutSine as easingMath } from './../../../../shared/styles/easingMath';




const {width:windowWidth, height:windowHeight} = Dimensions.get('window');
const {
    Extrapolate,
    Value,
    color,
    event,
    interpolate,
    createAnimatedComponent
} = Animated;


const { buildInputRange, buildOutputRange } = interpolateWithEasing(easingMath)

const SearchBox = ({scrollY})=>{

    const insets = useSafeArea();
    const TOP_SEARCH_BOX = 240
    const BOTTOM_SEARCH_BOX = windowHeight-(60+insets.bottom)-(ui.padding*1.5)-60
    const MIDDLE_SCREEN = windowHeight/2
    const HEIGHT_INPUT = 60
    const BORDER_RADIUS_INPUT = HEIGHT_INPUT/2
    const SIZE_ICON = 30
    const WIDTH_INPUT = (windowWidth*0.8)-(BORDER_RADIUS_INPUT*2)-SIZE_ICON
  
  
    const opacitySearchBox = interpolate(scrollY, {
      inputRange:  [0,160,200,320],
      outputRange: [1,1,0.3,1],
      extrapolate: Extrapolate.CLAMP,
    });
  
    const topSearchBox = interpolate(scrollY, {
      inputRange:  [0,...buildInputRange(160,(MIDDLE_SCREEN/2)-160)],
      outputRange: [TOP_SEARCH_BOX, ...buildOutputRange(TOP_SEARCH_BOX-160,BOTTOM_SEARCH_BOX ,(MIDDLE_SCREEN/2)-160)],
      extrapolate: Extrapolate.CLAMP,
    });
  
  
    const rightSearchBox = interpolate(scrollY, {
      inputRange:  [0,...buildInputRange(160,(MIDDLE_SCREEN/2)-160)],
      outputRange: [(windowWidth*0.1), ...buildOutputRange((windowWidth*0.1),(ui.padding*1.5) ,(MIDDLE_SCREEN/2)-160)],
      extrapolate: Extrapolate.CLAMP,
    });
  
    const rightIcon = interpolate(scrollY, {
      inputRange:  [0,...buildInputRange(160,(MIDDLE_SCREEN/2)-160)],
      outputRange: [30, ...buildOutputRange(30,18 ,(MIDDLE_SCREEN/2)-160)],
      extrapolate: Extrapolate.CLAMP,
    });
  
    const widthSearchBox = interpolate(scrollY, {
      inputRange:  [0,...buildInputRange(160,(MIDDLE_SCREEN/2)-160)],
      outputRange: [windowWidth*0.8, ...buildOutputRange(windowWidth*0.8, 60 ,(MIDDLE_SCREEN/2)-160)],
      extrapolate: Extrapolate.CLAMP,
    });
  
    const widthSeparator = interpolate(scrollY, {
      inputRange:  [0,160,190],
      outputRange: [2,2,0 ],
      extrapolate: Extrapolate.CLAMP,
    });
  
    const scaleinput = interpolate(scrollY, {
      inputRange:  [0,160,190],
      outputRange: [1,1,0 ],
      extrapolate: Extrapolate.CLAMP,
    });
  
    const red = (initial,final)=>interpolate(scrollY, {
      inputRange: [0,160,190],
      outputRange: [ initial,initial, final ],
      extrapolate: Extrapolate.CLAMP,
    });
  
    const green = (initial,final)=>interpolate(scrollY, {
      inputRange: [0,160,190],
      outputRange: [ initial,initial, final ],
      extrapolate: Extrapolate.CLAMP,
    });
  
    const blue = (initial,final)=>interpolate(scrollY, {
      inputRange: [0,160,190],
      outputRange: [ initial,initial, final ],
      extrapolate: Extrapolate.CLAMP,
    });
  
    const whiteToBlue = color(red(255,18),green(255,116),blue(255,186),1)
    const blueToWhite = color(red(18,255),green(116,255),blue(186,255),1)
  
    const widthInput = useRef(new Animated.Value(0)).current;
    const widthInput2 = useRef(new Animated.Value(0)).current;
    const widthInput3 = useRef(new Animated.Value(0)).current;
    const widthInput4 = useRef(new Animated.Value(0)).current;
    const opacityIndicator = useRef(new Animated.Value(0)).current;
  
    useEffect(()=>{
  
      const MAX = WIDTH_INPUT;
      const MIN = 0;
  
      const animate = (value, dest, callback)=>{
  
        setTimeout(()=>{
          Animated.timing(
            value,
              {
                toValue: dest,
                duration: 2000,
                easing: Easing.inOut(Easing.ease),
              },
          ).start(callback);
        },2000)
  
      }
  
      const on = ()=>{
  
        Animated.timing(
          opacityIndicator,
            {
              toValue: 1,
              duration: 300,
              easing: Easing.inOut(Easing.ease),
            },
        ).start(off);
        
      }
  
      const off = ()=>{
        
        Animated.timing(
          opacityIndicator,
            {
              toValue: 0,
              duration: 300,
              easing: Easing.inOut(Easing.ease),
            },
        ).start(on);
        
      }    
  
      const hidden = () => animate(widthInput,MIN,showed2)
      const hidden2 = () => animate(widthInput2,MIN,showed3)
      const hidden3 = () => animate(widthInput3,MIN,showed4)
      const hidden4 = () => animate(widthInput4,MIN,showed)
  
      const showed = () => animate(widthInput,MAX,hidden)
      const showed2 = () => animate(widthInput2,MAX,hidden2)
      const showed3 = () => animate(widthInput3,MAX,hidden3)
      const showed4 = () => animate(widthInput4,MAX,hidden4)
  
      on()
  
      showed()    
      
    },[])
  
  
    const styles = {
      
      searchBox:{
        position:'absolute',
        top:topSearchBox,
        right:rightSearchBox, 
        backgroundColor: whiteToBlue,
        paddingHorizontal:60/2,
        height:60,
        width:widthSearchBox,
        borderRadius:60/2,
        flexDirection:'row',
        justifyContent:'center',
        alignItems: 'center',
        ...ui.shadowBlur,
        opacity:opacitySearchBox
      },
      input:{
        position:'absolute',
        left:30,
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        transform:[{scale:scaleinput}],
        overflow: 'hidden'
      },
      separator:{
        width:widthSeparator,
        height:30,
        backgroundColor: colors.grey.t40,
        opacity:opacityIndicator
      },
      icon:{
        position:'absolute',
        right:rightIcon
      },
    }
  
    return(
      <Animated.View style={styles.searchBox}>
  
        <Animated.View style={{...styles.input,width:widthInput}}>
          <Text animated {...typography["body-18"]} color={colors.demandantes.primary}  extraStyles={{textAlign:'left', height:25}}> Corte de pasto</Text>
          <Animated.View style={styles.separator}/>
        </Animated.View>
  
        <Animated.View style={{...styles.input,width:widthInput2}}>
          <Text animated {...typography["body-18"]} color={colors.demandantes.primary}  extraStyles={{textAlign:'left', height:25}}> Instalar aire acondicionado</Text>
          <Animated.View style={styles.separator}/>
        </Animated.View>
  
        <Animated.View style={{...styles.input,width:widthInput3}}>
          <Text animated {...typography["body-18"]} color={colors.demandantes.primary}  extraStyles={{textAlign:'left', height:25}}> Cambiar el cuerito</Text>
          <Animated.View style={styles.separator}/>
        </Animated.View>
  
        <Animated.View style={{...styles.input,width:widthInput4}}>
          <Text animated {...typography["body-18"]} color={colors.demandantes.primary}  extraStyles={{textAlign:'left', height:25}}> Pintar exteriores</Text>
          <Animated.View style={styles.separator}/>
        </Animated.View>
                  
        <Search size={24} color={blueToWhite} extraStyles={styles.icon}/>                
      </Animated.View>
    )
}

export default SearchBox; 