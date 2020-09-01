import React from 'react'
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text, Thumbnail } from './../../../../shared/components/atoms';
import { colors, typography, ui, calculateSize } from '../../../../shared/styles';
import ArrowPush from './../../../../shared/vectors/arrowPush';


const ContactsCard = ({contact}) =>{


    const styles = {

        cardContainer:{
            paddingHorizontal:ui.padding,
            marginBottom:ui.margin,
            height:110
        },
        touchable:{
            ...ui.borderRadius,
            overflow:'hidden'
        },
        card:{
            flexDirection: 'row', 
            alignItems:'center',
            justifyContent:'space-around', 
            paddingVertical: ui.padding,
            paddingHorizontal:0,
            backgroundColor: colors.white(),
            width:'100%',
            height:'100%'
        },

    }
    

    return(

        <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.touchable}>
                <View style={styles.card}>
                    <View style={{paddingHorizontal: ui.padding, justifyContent: 'center', alignItems: 'center' }}>
                        <Thumbnail source={contact.photo} size={50} />
                        <View style={{position:'absolute', width:16, height:16, borderRadius:8, bottom:0, right:15, backgroundColor:contact.state?colors.correcto.primary:colors.neutral.primary, borderColor:colors.white(1), borderWidth:2}}/>
                    </View>
                    <View style={{flex: 1, flexDirection: 'column', alignItems: 'left', justifyContent: 'center', backgroundColor: 'transparent'}}>
                        <Text {...typography["body-strong-18"]} color={colors.grey.t80} extraStyles={{textAlign:'left', marginBottom: ui.padding*0.3}} >{contact.name}</Text>
                        <Text {...typography["body-16 "]} color={colors.grey.t80} extraStyles={{textAlign:'left'}} >{contact.skill}</Text>
                    </View>
                    <ArrowPush color={colors.demandantes.primary} size={24} extraStyles={{marginHorizontal: ui.padding}}/>
                </View>
            </TouchableOpacity>                            
        </View>
    )

}

export default ContactsCard;