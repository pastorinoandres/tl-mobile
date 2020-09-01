import React from 'react';
import { Text as TextRN } from 'react-native';
import { colors } from '../../styles';
import Animated from 'react-native-reanimated';



const defaultColor = colors.grey.t80

class Text extends React.Component{


    render(){

        const { children, typography , color = defaultColor, disabled = false, underline = false, extraStyles={}, animated, onLayout } = this.props;

        //Estilos
        const textStyles = {

            ...typography,
            color,
            opacity: (disabled)? 0.2 : 1,
            textAlign:'center',
            textDecorationLine: (underline)?'underline':'none',
            ...extraStyles

        }

        if(animated){

            return(

                <Animated.Text style={textStyles} onLayout={onLayout}>
                    {children}
                </Animated.Text>
            )

        }else{

            return(

                <TextRN style={textStyles} onLayout={onLayout}>
                    {children}
                </TextRN>
            )

        }
    }
    

}
            

export default Text 