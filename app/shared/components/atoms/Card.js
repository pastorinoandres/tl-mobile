import React from 'react';
import { ui, colors } from '../../styles';
import { Animated, Easing } from 'react-native'

const Card = ({children, disabled, style, width ='100%', height})=>{
 
    //Estilos
    const defaultStyles  = {

        alignItems:'center',
        justifyContent:'space-around',
        paddingVertical: ui.padding,
        paddingHorizontal:ui.padding,
        backgroundColor: colors.white(),
        width,
        opacity: (disabled)?0.6:1,
        ...ui.borderRadius,
        ...ui.shadow,
        ...style        

    }

    const cardStyles = height ? {...defaultStyles, height} : defaultStyles

    return (
        <Animated.View style={cardStyles}>
            {children}
        </Animated.View>
    );
}

export default Card;
  
