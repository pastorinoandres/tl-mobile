import React from 'react'
import { View } from 'react-native'

const  Line = ({color=colors.white(0.6), direction = 'horizontal', thickness=1, marginVertical = 0, marginHorizontal = 0, width='100%', height = '100%', extraStyles = {}}) => {

    //Estilos
    const lineStyles= {
        
        horizontal:{
            flex:1,
            height:thickness,
            backgroundColor:color, 
            marginVertical,
            ...extraStyles
        },
        vertical:{
            width:thickness, 
            height, 
            backgroundColor:color, 
            marginHorizontal,
            ...extraStyles
        }

    }

    if(direction === 'horizontal'){
        
        return (
           
            <View style={{flexDirection:'row',width}}>
                <View style={lineStyles.horizontal}/>
            </View>
            
        )

    }else{

        return(
            <View style={lineStyles.vertical}/> 
        )

    }

}

export default Line;