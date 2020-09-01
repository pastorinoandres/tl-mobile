import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing,  } from 'react-native';
import { Card } from './../atoms';
import { useAnimatedValue } from  './../../../hooks';

const FlipCard = ({face, FrontComponent, BackComponent, heightCard = 400 })=>{

    //Referencias
    const animation = useAnimatedValue(0)
    const mounted = useRef()

    //Efectos
    useEffect(()=>{

        if(!mounted.current){

            mounted.current = true

        }else{

            if(face === 'back'){

                Animated.timing(animation,
                    {
                        toValue: 180,
                        delay:100,
                        duration:2000,
                        easing:Easing.inOut(Easing.ease)
                    }).start();

            }else{

                Animated.timing(animation,
                    {
                        toValue: 0,
                        delay:100,
                        duration:2000,
                        easing:Easing.inOut(Easing.ease)
                    }).start();

            }

        }

    },[face])


    //Constantes de animación
    const rotationFront = animation.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg'],
      })
    
    const rotationBack = animation.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg'],
    })

    //Estilos
    const styles = {
        front:{        
            backfaceVisibility: 'hidden',
            position:'absolute',
            top:0,
            width:'100%',
            flex:1,
            transform:[{rotateY:rotationFront},{perspective:800}]
        },
        back:{        
            backfaceVisibility: 'hidden',
            position:'absolute',
            top:0,
            width:'100%',
            flex:1,
            transform:[{rotateY:rotationBack},{perspective:800}]
        }
    }
    
    
    return (

        <View style={{width:'100%',height: heightCard, position: 'relative'}}>
            <Card style={styles.front} height={heightCard}>
                <FrontComponent/>
            </Card>
            <Card style={styles.back} height={heightCard}>
                <BackComponent/>
            </Card>
        </View>
    );
  
}

export default React.memo(FlipCard);