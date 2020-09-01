import React from 'react'
import { Text } from './../atoms';
import { typography, colors, ui } from './../../styles';

const InputLabel = ({text})=>(

    <Text {...typography["body-16"]} color={colors.grey.t40} extraStyles={{textAlign:'left',paddingBottom:ui.padding}}>
        {(text)?text:'Etiqueta'}
    </Text>
)

export default InputLabel;