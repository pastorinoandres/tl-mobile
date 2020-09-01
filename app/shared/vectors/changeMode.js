import React from 'react'
import Svg, { Path, G, Mask, Defs, ClipPath, Rect } from 'react-native-svg';
import { View } from 'react-native'
import {colors} from '../styles';

export default ChangeMode = ({size=20, color=colors.acento.primary, extraStyles={}})=>{

    return(
        <View style={{width:size, aspectRatio:1, ...extraStyles}}>
            <Svg width="100%" height="100%" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M13 0C5.82029 0 0 5.82029 0 13C0 20.1797 5.82029 26 13 26C20.1797 26 26 20.1797 26 13C26 5.82029 20.1797 0 13 0ZM13 24.375C6.71775 24.375 1.625 19.2822 1.625 13C1.625 6.71775 6.71775 1.625 13 1.625C19.2822 1.625 24.375 6.71775 24.375 13C24.375 19.2822 19.2822 24.375 13 24.375Z" fill={color}/>
                <Path d="M16.0144 5.1106L14.8606 6.26435L16.7294 8.12497H8.125C7.22754 8.12497 6.5 8.85251 6.5 9.74997V12.1875H8.125V9.74997H16.7294L14.8688 11.6106L16.0144 12.7562L19.2644 9.50622C19.5794 9.1893 19.5794 8.67752 19.2644 8.3606L16.0144 5.1106Z" fill={color}/>
                <Path d="M17.8757 16.2499H9.27128L11.1319 14.3893L9.98628 13.2437L6.73629 16.4937C6.42124 16.8106 6.42124 17.3224 6.73629 17.6393L9.98628 20.8893L11.1319 19.7437L9.27128 17.8749H17.8757C18.7731 17.8749 19.5007 17.1474 19.5007 16.2499V13.8124H17.8757V16.2499Z" fill={color}/>
            </Svg>
        </View>
    )

}


