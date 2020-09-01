import React from 'react'
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native'
import {colors} from '../styles';

export default DownArrow = ({size=26, color=colors.acento.primary, extraStyles={}})=>{

    return(
        <View style={{width:size, aspectRatio:11/6, ...extraStyles}}>
            <Svg width="100%" height="100%"  viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path opacity="0.8" d="M1 1L5.5 5L10 1" stroke={color} stroke-width="0.8"/>
            </Svg>
        </View>
    )

}
