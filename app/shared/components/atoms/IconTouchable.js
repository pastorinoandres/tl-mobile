import React from 'react'
import { TouchableOpacity, View } from 'react-native'


const IconTouchable = ({Icon, size, area, onPress})=> {

    //Estilos
    const iconStyles = {
        height:area, 
        width:area, 
        justifyContent:'center', 
        alignItems: 'center'
    }
    
    return(

        <TouchableOpacity onPress={onPress}>
            <View style={iconStyles}>
                <Icon size={size}/>
            </View>
        </TouchableOpacity>

    )
}

export default IconTouchable;
