import React from 'react'
import { View,TouchableOpacity } from 'react-native';
import { Text, Thumbnail } from './../../../../shared/components/atoms';
import { colors, typography, ui } from '../../../../shared/styles';
import { PROFILE } from "../../../../navigation/constants";
import { useNavigation } from "../../../../hooks";
import {images} from "../../../../utils/images"; 


const CategoryPreviewCard = ({contact}) =>{

    const navigation = useNavigation();
    const styles = {
        azul:{
            width:30, 
            height:30, 
            backgroundColor:'rgb(0, 100, 255)', 
            borderRadius:100,
            paddingVertical: 5,
        },
        rojo:{
            width:30, 
            height:30, 
            backgroundColor:'rgb(255, 0, 0)', 
            borderRadius:100,
            paddingVertical: 5,
        },
        naranja:{
            width:30, 
            height:30, 
            backgroundColor:'rgb(255, 205, 0)', 
            borderRadius:100,
            paddingVertical: 5,
        },
        amaVerde:{
            width:30, 
            height:30, 
            backgroundColor:'rgb(0, 255, 0)', 
            borderRadius:100,
            paddingVertical: 5,
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

    const backColor = (color) =>{
        if(color == 0){
                return <Text {...typography["body-strong-16"]} color={colors.grey.t80}>S/ Calificar aun</Text>    
            }else if ( color > 0 && color <= 2.5) {
                return <Text {...typography["body-strong-16"]} color={colors.white(1)} 
                extraStyles={styles.rojo}
                >{contact.qualification}</Text>
        }   else if(color > 2.5 && color <= 5){
                return <Text {...typography["body-strong-16"]} color={colors.white(1)} 
                extraStyles={styles.naranja}
                >{contact.qualification}</Text>
        }   else if(color > 5 && color <= 7.5 ){
                return <Text {...typography["body-strong-16"]} color={colors.white(1)} 
                extraStyles={styles.amaVerde}
                >{contact.qualification}</Text>
        }   else {
                return <Text {...typography["body-strong-16"]} color={colors.white(1)} 
                extraStyles={styles.azul}
                >{contact.qualification}</Text>
        } 
        
    };

    return(

        <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.touchable} onPress={openProfile(contact)}> 
                <View style={styles.card}>
                    <View style={{paddingHorizontal: ui.padding, justifyContent: 'center', alignItems: 'center' }}>
                        <Thumbnail source={contact.photo} size={50} />
                        <View style={{position:'absolute', width:16, height:16, borderRadius:8, bottom:0, right:15, backgroundColor:contact.state?colors.correcto.primary:colors.neutral.primary, borderColor:colors.white(1), borderWidth:2}}/>
                    </View>
                    <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', backgroundColor: 'transparent'}}>
                        <Text {...typography["body-strong-18"]} color={colors.grey.t80} extraStyles={{textAlign:'left', marginBottom: ui.padding*0.3}} >{contact.name}</Text>
                           
                            <View style={{ flexDirection: 'row'}}>
                                <Thumbnail source={images.marker} size={20} />
                                <Text {...typography["body-16 "]} color={colors.grey.t80}  >{contact.city}</Text>
                                <Text {...typography["body-16 "]} color={colors.grey.t80}  >{"  " + contact.distance + " Km" }</Text>
                            </View>
                            <View style={{alignSelf:'center',marginLeft:ui.margin*10}}>
                                {backColor(contact.qualification)}
                                
                            </View>
                            
                        
                        
                    </View>
                    
                </View>
            </TouchableOpacity>                            
        </View>
    )

}






export default CategoryPreviewCard;