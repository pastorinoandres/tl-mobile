import React, { useCallback } from 'react'
import { BackHandler, Keyboard, Dimensions, Animated, Easing } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { BackArrow, Cross } from '../../../shared/vectors';
import { Group, IconTouchable, Text } from '../../../shared/components/atoms'
import { ui, calculateSize } from '../../../shared/styles'
import { useAnimatedValue, useKeywordListeners } from '../../../hooks'

const { width } = Dimensions.get('window')



const Header = ({ onGoBack, menuName, onPressMenu, disabledMenu, backIcon=true, title }) => {

    const navigation = useNavigation();

    const animation = useAnimatedValue(0)

    useFocusEffect(
        React.useCallback(() => {

          const onBackPress = () => {

            if(onGoBack){
                onGoBack()
                return true
            }else{
                return false
            }

          };
    
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
          return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [onGoBack])
      );



    const keyboardDidShow = ()=> {
        Animated.timing(animation,{
            toValue:1,
            duration:500
        }).start()
    }

    const keyboardDidHide = ()=> {
        Animated.timing(animation,{
            toValue:0,
            duration:500
        }).start()
    }

    useKeywordListeners(keyboardDidShow,keyboardDidHide)

    const goBack = ()=>{

        if(onGoBack){
            onGoBack()
        }else{
            navigation.goBack();
        }
        
    }

    //Constantes de animación
    const opacity = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
    });
    const transform = [{translateX: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, width],
    })}];

    const opacity1 = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
    });
    const transform1 = [{translateX: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -width],
    })}];

    //Estilos
    const styles = {

        container: {
            flexDirection: 'row',
            justifyContent:'space-between',
            alignItems:'center',
        },
        backArrow:{
            opacity:opacity1,
            transform:transform1,
        },
        title:{
            position:'absolute',
            left:ui.padding + ui.borderRadius.borderRadius,
            opacity: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
            })
        },
        buttonText:{
            opacity,
            transform,
        },
        x:{
            position:'absolute',
            right:ui.padding,
            opacity: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.6],
            })
        }

    }        
    

    return (

        <Group style={styles.container}>


            { backIcon && (

                <Animated.View style={styles.backArrow}>
                    <IconTouchable 
                        Icon={BackArrow} 
                        size={calculateSize(25)} 
                        area={calculateSize(60)} 
                        onPress={goBack}
                    />
                </Animated.View>
                    
            )}

            { title && (

                <Animated.View style={styles.title}>
                    <Text {...typography["title-24"]} color={colors.white(1)}>
                        {title}
                    </Text>
                </Animated.View>

            )}

            

            {(menuName) && (
                
                <Animated.View style={styles.buttonText}>
                    <Button 
                        title={menuName} 
                        onPress={onPressMenu}
                        disabled={disabledMenu} 
                        type='transparent' 
                        fit 
                        theme='light' 
                        last>
                    </Button>
                </Animated.View>
            )}

            <Animated.View style={styles.x}>
                <IconTouchable 
                    Icon={Cross} 
                    size={calculateSize(20)} 
                    area={calculateSize(30)} 
                    onPress={()=>{keyboardDidHide();Keyboard.dismiss()}} 
                />
            </Animated.View>  

        </Group>
    )
    
}



export default Header;