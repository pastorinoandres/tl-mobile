import React from 'react'
import Svg, { Path, Line} from 'react-native-svg';
import { View } from 'react-native'
import Animated from 'react-native-reanimated';

const LineA = Animated.createAnimatedComponent(Line)
const PathA = Animated.createAnimatedComponent(Path)


export default Search = ({size=75, color, extraStyles={}})=>{

    return(
        <Animated.View style={{width:size, aspectRatio:1, ...extraStyles}}>
            <Svg width="100%" height="100%" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <LineA y1="-0.5" x2="11.9424" y2="-0.5" transform="matrix(0.657318 -0.753613 0.741125 0.671367 3.74121 24)" stroke={color} strokeWidth={1.5}/>
                <PathA d="M22.2412 9.5C22.2412 13.366 19.1072 16.5 15.2412 16.5C11.3752 16.5 8.24121 13.366 8.24121 9.5C8.24121 5.63401 11.3752 2.5 15.2412 2.5C19.1072 2.5 22.2412 5.63401 22.2412 9.5Z" stroke={color} strokeWidth={1.5}/>
            </Svg>
        </Animated.View>
    )

}