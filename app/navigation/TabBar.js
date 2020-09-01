import React, { useContext, useState} from 'react'
import { View, TouchableOpacity, Dimensions } from 'react-native';
import { AnimationSync } from './../animations';
import Animated, { Easing } from 'react-native-reanimated';
import { ui, calculateSize, typography, colors } from '../shared/styles';
import { useSafeArea  } from 'react-native-safe-area-context';
import Text from './../shared/components/atoms/Text';
import { Home } from '../shared/vectors';
import Store from './../shared/vectors/store';
import Contacts from './../shared/vectors/contacts';


const {
    Extrapolate,
    Value,
    abs,
    Clock,
    block,
    cond,
    eq,
    set,
    add,
    and,
    multiply,
    greaterThan,
    clockRunning,
    startClock,
    stopClock,
    event,
    interpolate,
    timing,
} = Animated;

const {width:windowWidth, height:windowHeight} = Dimensions.get('window');

const tabIcons = [
    {
        name: 'Inicio',
        icon: Home
    },
    {
        name: 'Tienda',
        icon: Store
    },
    {
        name: 'Agenda',
        icon: Contacts
    }
]


export default function TabBar({ state, descriptors, navigation }) {

    const swipeMenu = useContext(AnimationSync);

    const insets = useSafeArea();
  
    const{ tX:translationX } = swipeMenu
    
    const translateY = interpolate(translationX, {
        inputRange: [ -0.8*windowWidth, 0],
        outputRange: [ 60+insets.bottom, 0 ],
        extrapolate: Extrapolate.CLAMP,
    });

    const opacity = interpolate(translationX, {
        inputRange: [ -0.8*windowWidth, -0.4*windowWidth, 0],
        outputRange: [ 0, 1, 1 ],
        extrapolate: Extrapolate.CLAMP,
    });


    const styles={

        container:{

            backgroundColor:'white',
            width: '100%',
            position: 'absolute',
            bottom:0,
            right:0,
            left:0,         
            borderTopLeftRadius:15,
            borderTopRightRadius:15,        
            opacity,
            transform:[{translateY}],
            shadowColor: '#000000',
            shadowOffset: {
                width: 0,
                height: -3
            },
            shadowOpacity: 0.15,
            shadowRadius: 4,
            elevation: 3,
            paddingBottom: insets.bottom,
            marginTop:3

        },
        tab:{ 

            flex: 1, 
            height:60, 
            justifyContent:'flex-end', 
            alignItems:'center',  

        }

    }

  return (
    <Animated.View style={styles.container}>

        <View style = {{flex:1, flexDirection:'row',}}>

        {
            state.routes.map((route, index) => {

                const { options } = descriptors[route.key];

                const label = route.name;

                const disabledColor = '#999999'

                const Icon = tabIcons.find( item => item.name===label).icon

                const isFocused = state.index === index;

                const onPress = () => {

                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }

                };

                const onLongPress = () => {

                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });

                };

                return (

                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        key={index}
                        onLongPress={onLongPress}
                        style={styles.tab}
                    >
                        <Icon color ={isFocused ? colors.demandantes.primary : disabledColor} size={25}/>
                        <Text {...typography["body-14"]} color={ isFocused ? colors.demandantes.primary : disabledColor} extraStyles={{textAlign:'center', marginTop:5 }}>
                            {label}
                        </Text>
                    </TouchableOpacity>

                );
            })
        }

        </View>

    </Animated.View>
  );
}