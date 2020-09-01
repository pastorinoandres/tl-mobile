import React from 'react'
import { Text } from './../atoms';
import { typography, colors, calculateSize } from './../../styles';

const InputError = ({error, touched})=>{

    const styles ={
        paddingVertical:calculateSize(5), 
        textAlign:'left'
    }

    if(error && touched){

        return(

            <Text {...typography["caption-12"]} color={colors.error.primary} extraStyles={styles}>
                {error}
            </Text>

        )
    }else{
        return null
    }   

}

export default InputError;