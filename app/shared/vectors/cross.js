


import React from 'react'
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native'

export default Cross = ({size=11, extraStyles={}})=>{

    return(
        <View style={{width:size, aspectRatio:1, ...extraStyles}}>
            <Svg width="100%" height="100%" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M10 1L1 10M10 10L1 1" stroke="white" stroke-width="2"/>
            </Svg>
        </View>
    )

}

