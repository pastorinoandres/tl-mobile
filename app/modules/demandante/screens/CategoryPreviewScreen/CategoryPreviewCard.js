import React from 'react'
import { View,TouchableOpacity } from 'react-native';
import { Text, Thumbnail } from './../../../../shared/components/atoms';
import { colors, typography, ui } from '../../../../shared/styles';
import { PROFILE } from "../../../../navigation/constants";
import { useNavigation } from "../../../../hooks";
import {images} from "../../../../utils/images"; 
import { getRepTextAndColor } from '../ProfileScreen/utils/getRepTextAndColor';



const CategoryPreviewCard = ({contact}) =>{

    const navigation = useNavigation();
    const styles = {
        iconCircle:{
            width: 40,
            height: 40,
            borderRadius: 20,
            marginRight: 20,
            justifyContent: "center",
            alignItems: "center", 
            textAlignVertical: 'center',    
          },
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

    const openProfile = (contact) => {
        return () => {
          navigation.navigate(PROFILE, contact);
        };
    };

    const {color}= getRepTextAndColor(contact.reputation)

    

    return(

        <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.touchable} onPress={openProfile(contact)}> 
                <View style={styles.card}>
                    <View style={{paddingHorizontal: ui.padding, justifyContent: 'center', alignItems: 'center' }}>
                        <Thumbnail source={contact.image} size={50} />
                        <View style={{position:'absolute', width:16, height:16, borderRadius:8, bottom:0, right:15, backgroundColor:contact.state?colors.correcto.primary:colors.neutral.primary, borderColor:colors.white(1), borderWidth:2}}/>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'transparent'}}>
                            <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
                                <Text {...typography["body-strong-18"]} 
                                    color={colors.grey.t80} 
                                    extraStyles={{textAlign:'left', marginBottom: ui.padding*0.3}} >
                                    {contact.name}
                                </Text>
                            
                                <View style={{ flexDirection: 'row'}}>
                                    <Thumbnail source={images.marker} size={20} />
                                    <Text {...typography["body-16 "]} color={colors.grey.t80}  >{contact.city}</Text>
                                    
                                </View>
                            </View>
                            <View style={{...styles.iconCircle, backgroundColor:color}}>
                                 <Text {...typography["body-strong-16"]} color={colors.white()} >{contact.reputation}</Text> 
                            </View>
                            
                        
                        
                    </View>
                    
                </View>
            </TouchableOpacity>                            
        </View>
    )

}






export default CategoryPreviewCard;