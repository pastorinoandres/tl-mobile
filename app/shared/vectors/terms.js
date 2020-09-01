import React from 'react'
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native'
import { colors } from '../styles'


export default Terms = ({size=20, check = true})=>{


    console
    const color = check? "#F2F1EF" : "transparent";
    const border = check? 0 : 0.5

    return(
        <View style={{width:size, aspectRatio:1, borderRadius:size/2 , borderColor: colors.error.secondary, borderWidth: border }}>
            <Svg width="100%" height="100%" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 0 7.5 0C3.35786 0 0 3.35786 0 7.5C0 11.6421 3.35786 15 7.5 15Z" fill={colors.white(0.2)}/>
                <Path d="M13.7813 3.41016L7.14844 10.2774L7.16016 11.0157H7.46485L14.6485 5.22657C14.4375 4.58205 14.1446 3.96095 13.7813 3.41016Z" fill="transparent"/>
                <Path d="M14.8595 3.08205L13.5352 1.76954C13.3594 1.59375 13.0665 1.59375 12.879 1.76954L7.21879 7.61722L4.76955 5.20316C4.59376 5.02736 4.30079 5.02736 4.11331 5.20316L2.94141 6.36333C2.76562 6.53912 2.76562 6.83208 2.94141 7.00787L6.85551 10.8868C6.96099 10.9923 7.10161 11.0274 7.24224 11.0157C7.38286 11.0274 7.52348 10.9922 7.62896 10.8868L14.8595 3.7383C15.0353 3.55078 15.0353 3.25782 14.8595 3.08205Z" fill={color}/>
                <Path d="M7.62895 10.8868L14.8595 3.73829C15.0353 3.5625 15.0353 3.26953 14.8595 3.09374L14.6485 2.89453L7.23051 10.1836L3.12892 6.18753L2.95313 6.36332C2.77734 6.53911 2.77734 6.83208 2.95313 7.00787L6.86723 10.8868C6.97271 10.9923 7.11333 11.0274 7.25395 11.0157C7.38285 11.0274 7.52347 10.9922 7.62895 10.8868Z" fill={color}/>
            </Svg>
        </View>
    )

}


