import React, { Component } from 'react'
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native'

export default Warning = ({size=2})=>{

    return(
        <View style={{width:size, aspectRatio:2/14}}>
            <Svg width="100%" height="100%" viewBox="0 0 2 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M1 0.5V11.5M1 12.5V14" stroke="white" stroke-width="2"/>
            </Svg>
        </View>
    )

}

