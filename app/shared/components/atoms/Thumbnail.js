import React from 'react';
import {Image, View, TouchableWithoutFeedback } from 'react-native';
import { calculateSize } from '../../styles';


const defaultImage = '../../../../assets/defaultImage.png'

const Thumbnail =  ({source, size=calculateSize(256), shape = 'circle', onPress=()=>{}, extraStyles={} }) => {  
 
    //Estilos
    const thumbnailStyles = {
            height: size,
            width:size,
            borderRadius: shape === 'circle' ? (size/2) : 0,
    }

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={{...thumbnailStyles, ...extraStyles}}>
                <Image
                    style={thumbnailStyles}
                    source={source}
                    defaultSource={require(defaultImage)}
                />
            </View>
        </TouchableWithoutFeedback>
    );
  
}

export default Thumbnail;
