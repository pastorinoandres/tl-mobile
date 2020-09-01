import React from 'react'
import { View } from 'react-native'

export default Group = ({children, style, flex})=>{

    //Estilos
    const styles = {
        width:'100%', 
        ...style
    }

    const groupStyles = (flex) ? {...styles, flex:1} : styles

    
    return(
        <View style={groupStyles}>
            {children}
        </View>
    )
}