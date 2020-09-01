import React from 'react'
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native'
import {colors} from '../styles';

export default BackArrow = ({size=26, color=colors.white(), extraStyles={}})=>{

    return(
        <View style={{width:size, aspectRatio:26/20, ...extraStyles}}>
            <Svg width="100%" height="100%" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M2 10.45H26M2 10.45L10.4 1M2 10.45L10.4 19" stroke={color} stroke-width="1.5"/>
            </Svg>
        </View>
    )

}
