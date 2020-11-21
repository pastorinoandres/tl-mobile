import React from 'react';
import { Text } from '../atoms';
import { typography, colors, ui } from '../../styles';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');



const CardWithTitle = ({ children, title = "Titulo de la card" })=>{

    //Estilos
    const styles = {        
        title:{            
            textAlign:"left",
            marginBottom: ui.padding/2,

                                    
        },
        container:{
            marginBottom: ui.margin*2,
            width:"100%",
                        
        },
        card:{
            backgroundColor:"#FFFFFF",
            borderRadius: 16,
            padding: 16,
        }
        
    }
 

    return (

        <View style={styles.container}>
            <Text {...typography["title-20"]} extraStyles={styles.title}>{title}</Text>
            <View style={styles.card}>{children}</View>            
        </View>
    )



    
}

export default CardWithTitle;