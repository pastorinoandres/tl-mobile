import React from 'react';
import { Text, Group, Thumbnail, Card } from '../../../shared/components/atoms';
import { View, StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const ContainerCard = View;
const ContainerThumbnail = View;


const ProfileCard = ({ children, onPressPhoto, photo, defaultPhoto, headerTitle })=>{

    const sizeThumbnail = 150;

    //Estilos
    const styles = {
        conteinerCard:{
            zIndex:1,
            marginBottom:ui.margin,
        },
        card:{            
            paddingBottom:2,
            paddingTop:75,
            paddingHorizontal:2,
            width:'100%',
            marginTop:75
        },
        thumbnail:{
           ...ui.shadow
        },
        containerThumbnail:{
            zIndex:2,
            position: 'absolute',
            width:'100%',
            justifyContent: 'flex-start',
            alignItems:'center',
            ...ui.shadow,
        },
        text:{
            marginTop:25, 
            marginBottom:30, 
            textAlign:'center'
        }
    }
 

    return(

        <ContainerCard style={styles.conteinerCard}>
                            
            <Card style={styles.card}>
                <Group>
                    <Text {...typography["title-20"]} color={colors.acento.primary} extraStyles={styles.text} >
                        {headerTitle}
                    </Text>
                    {children}
                </Group>
            </Card>

            <ContainerThumbnail style={styles.containerThumbnail}>
                <Thumbnail 
                    onPress={onPressPhoto} 
                    source={photo} 
                    DefaultImage={defaultPhoto} 
                    size={sizeThumbnail} 
                    extraStyles={styles.thumbnail}
                />
            </ContainerThumbnail>


        </ContainerCard>
    )

    
}

export default ProfileCard;