import React from 'react'
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text } from './../../../../shared/components/atoms';
import { colors, typography, ui, calculateSize } from '../../../../shared/styles';


const NuevosProyectos = () =>{


    const proyectos = [

        {
            image:require('../../../../../assets/proyecto1.png'),
            title:'Refacción de la cocina',
        },
        {
            image:require('../../../../../assets/proyecto2.png'),
            title:'Emprende tu negocio',
        },
        {
            image:require('../../../../../assets/proyecto3.png'),
            title:'Nueva habitación',
        }

    ]

    const styles = {

        mainContainer:{
            marginTop:ui.padding
        },
        title:{
            paddingLeft:ui.padding+ (ui.borderRadius.borderRadius/2),
            textAlign:'left',
            marginBottom:ui.padding*0.5
        },
        cardContainer:{
            paddingLeft:ui.padding, 
            textAlign:'left',
            marginVertical:ui.padding,
            width:calculateSize(330),
            aspectRatio:330/175,
            ...ui.shadowBlur
        },
        touchable:{
            ...ui.borderRadius,
            overflow:'hidden'
        },
        image:{
            width:'100%',
            height:'100%'
        },
        cardFooter:{
            position:'absolute',
            bottom:0, 
            left:0, 
            right:0, 
            backgroundColor: colors.white(0.98), 
            height:calculateSize(60),
            justifyContent:"space-around",
            padding:ui.padding
        },

    }
    

    return(
        <View style={styles.mainContainer}>
            <Text {...typography["body-strong-18"]} color={colors.grey.t80}  extraStyles={styles.title}>Nuevos proyectos</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {proyectos.map((item, index)=>{
                    return(
                        <View style={styles.cardContainer} key={`${item.title}->${index}`}>
                            <TouchableOpacity style={styles.touchable}>
                                <Image source={item.image} style={styles.image}/>
                                <View style={styles.cardFooter}>
                                    <Text {...typography["body-strong-14"]} color={colors.grey.t80} extraStyles={{textAlign:'left'}}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>                            
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )

}

export default NuevosProyectos;