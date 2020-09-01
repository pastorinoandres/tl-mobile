import React from 'react';
import { ScrollView } from 'react-native';
import { Text, Group } from '../../../shared/components/atoms';
import { typography, colors, ui } from '../../../shared/styles';
import { Check }  from './../../../shared/vectors';

export default Tips = ({list}) =>{

    const styles={

        scrollview:{
            justifyContent:'flex-start', 
            alignItems:'flex-start', 
            padding: ui.padding-2, 
            paddingTop:0
        },
        group:{
            flexDirection: 'row',
            justifyContent:'flex-start', 
            alignItems: 'center',
            paddingLeft: 2
        },
        text:{
            marginVertical:5, 
            textAlign:'left'
        },
        check:{
            marginRight: 10
        }
        
    }

    return (

        <ScrollView style ={{width:'100%'}} contentContainerStyle={styles.scrollview}>
        
            {list.map((tip, index)=>{

                return (
                
                <Group key={index} style ={styles.group}>
                    
                    <Check size={20} color={'Black'} extraStyles={styles.check}/>
                    <Text {...typography["body-18"]} color={colors.acento.primary} extraStyles={styles.text}>
                        {tip}
                    </Text>
                    
                </Group>
                )
            })}

        </ScrollView>

    )

}