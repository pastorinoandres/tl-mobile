import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeArea } from 'react-native-safe-area-context';

const Container =  ({children, gradient, safeArea, style}) => {

    const insets = useSafeArea();
    //Estilos    
    const styleContainer = {
        flex:1,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        paddingTop:(safeArea)?insets.top:0,
        paddingBottom:(safeArea)?insets.bottom:0,
        ...style
    }

    if(gradient){

        return(            
            <LinearGradient style={styleContainer} {...gradient}>
                {children}
            </LinearGradient>            
        )

    }else{

        return(
            <View style={styleContainer}>
                {children}
            </View>
        )

    }    
}


export default Container;