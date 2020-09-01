import React from 'react';
import { Text, Card } from '../../../shared/components/atoms';
import { View, ScrollView } from 'react-native';
import { typography, colors, ui } from '../../../shared/styles';


import { Dimensions } from 'react-native';

const {width:windowWidth, height:windowHeight} = Dimensions.get('window');

export default FormCard = ({title, maxHeight = 350, children}) => {

    const styles ={

        card:{
            flex:1,
            width:'100%',
            paddingHorizontal:2, 
            justifyContent: 'flex-start',
            marginVertical:ui.margin,
            paddingTop:30, 
            paddingBottom:0,
            overflow:'hidden',
            maxHeight
        },
        text:{
            width: '100%', 
            textAlign:'left', 
            padding: ui.padding
        },
        scrollview:{
            justifyContent:'flex-start', 
            alignItems:'flex-start', 
            padding: ui.padding-2, 
            paddingTop:0
        }

    }

    // <Text {...typography["title-24"]} color={colors.acento.primary} extraStyles={styles.text}>
    //             {title}
    //         </Text>
    

    return (
                
                    
        <Card style={styles.card} >

            <ScrollView style ={{width:'100%'}} contentContainerStyle={styles.scrollview}>                    
                {children}
            </ScrollView>
    
        </Card>
                    
    )

}





