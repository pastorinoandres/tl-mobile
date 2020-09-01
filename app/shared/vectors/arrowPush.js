import React from 'react'
import Svg, { Line } from 'react-native-svg';
import { View } from 'react-native'
import {colors} from '../styles';

export default ArrowPush = ({size=25, color=colors.acento.primary, extraStyles={}})=>{

    return(
        <View style={{width:size, aspectRatio:1,  ...extraStyles}}>
            <Svg width="100%" height="100%" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Line x1="1.32414" y1="23.1703" x2="13.1703" y2="11.3242" stroke={color} stroke-width="2"/>
                <Line x1="12.311" y1="11.879" x2="1.13908" y2="0.707119" stroke={color} stroke-width="2"/>
            </Svg>
        </View>
    )

}
