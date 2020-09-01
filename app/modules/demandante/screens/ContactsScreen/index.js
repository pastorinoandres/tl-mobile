import React, { useContext, useRef, useState, useEffect } from 'react';
import { View, Dimensions, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { typography, colors, ui, calculateSize } from '../../../../shared/styles';
import Text from '../../../../shared/components/atoms/Text';
import { Screen } from '../../../../shared/components/organisms';
import { Button } from '../../../../shared/components/molecules';
import { AnimationSync } from '../../../../animations';
import Animated, { Easing } from 'react-native-reanimated';
import { useSafeArea  } from 'react-native-safe-area-context';
import { HamburgerMenu } from '../../../../shared/components/organisms';
import {Settings, ChangeMode, ShareAction, GiveFeedback, SignOut, Pedidos as PedidosIcon} from '../../../../shared/vectors';
import useActions from '../../../../hooks/useActions';
import { LinearGradient } from 'expo-linear-gradient';
import { Thumbnail } from '../../../../shared/components/atoms';
import MainHeader from './MainHeader';
import ContactsCard from './ContactsCard';
import Contacts from './../../../../shared/vectors/contacts';



const {width:windowWidth, height:windowHeight} = Dimensions.get('window');
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
    or,
    multiply,
    greaterThan,
    clockRunning,
    startClock,
    stopClock,
    event,
    interpolate,
    timing,
    debug,
    concat
} = Animated;




const ContactsScreen = (props) => {

  const [ isReady, setIsReady ] = useState(false)
  
  useEffect(()=>{

    setTimeout(()=>setIsReady(true),3500)
  },[])

  const { login, logout } = useActions( 'login', 'logout' )

  const options = [
    {
      name:'Cambiar al  modo trabajador',
      Icon:ChangeMode,
      action:()=>Alert.alert('hiciste click en la option')
    },   
    {
      name:'Configuración de la app',
      Icon:Settings,
      action:()=>Alert.alert('hiciste click en la option')
    },    
    {
      name:'Importar contactos del celular',
      Icon:Contacts,
      action:()=>Alert.alert('hiciste click en la option')
    },

  ]

  const contacts ={

      recently: [
        {
          name:'Nahuel Cristofoli',
          skill:'Ingeniero Industrial',
          photo:require("../../../../../assets/nahuel.jpg"),
          state:true
        },
        {
            name:'Mariano Busti',
            skill:'Couch Emprendedor',
            photo:require("../../../../../assets/mariano.jpg"),
            state:false
        },
        {
            name:'Marcelo Ponti',
            skill:'Diseñador Grafico',
            photo:require("../../../../../assets/marce.jpg"),
            state:true
        },
      ],
      all:[
        {
          name:'Alejandro DiLuca',
          skill:'Productor de cine',
          photo:require("../../../../../assets/alejandro.jpg"),
          state:true
        },
        {
            name:'Nicolas Perazzo',
            skill:'Economista',
            photo:require("../../../../../assets/nico.jpg"),
            state:false
        },
        {
            name:'Damian Grimberg',
            skill:'Desarrollador',
            photo:require("../../../../../assets/dami.jpg"),
            state:false
        },

      ]

  }
  
    

  const insets = useSafeArea();

  const styles={

    container:{
      flex:1, 
      width: '100%', 
      justifyContent:'flex-start',
      backgroundColor:colors.backgroundGrey.primary
    },
    space:{
      height:210,
      width:'100%'
    },
    spaceInitial:{
      height: 70 + insets.top + ui.margin + ui.padding + calculateSize(50) + ui.padding
    },
    mainContainer:{
      marginTop:ui.padding
    },
    title:{
        paddingLeft:ui.padding+ (ui.borderRadius.borderRadius/2),
        textAlign:'left',
        marginBottom:ui.padding
    },
  }

  const scrollView = useRef(null);

  const scrollY = useRef(new Value(0)).current

  const onScroll = event(
    [
      {
        nativeEvent: { 
          contentOffset: {
            y: scrollY
          }
        }
      }
    ],
    { useNativeDriver: true },
  )


    
  return (

    <Screen {...props} options={options} initialAnimation>
      <View style={styles.container}> 
        <Animated.ScrollView
          onScroll={onScroll} 
          scrollEventThrottle ={1}
          ref={scrollView}>
          <View style={styles.spaceInitial}/>
          <View style={styles.mainContainer}>
              <Text {...typography["body-strong-18"]} color={colors.grey.t80}  extraStyles={styles.title}>Con actividad reciente</Text>
              {contacts.recently.map((item, index)=>(<ContactsCard contact={item} key={`${item.name}->${index}`} />))}
          </View>
          <View style={styles.mainContainer}>
              <Text {...typography["body-strong-18"]} color={colors.grey.t80}  extraStyles={styles.title}>Contactos agendados</Text>
              {contacts.all.map((item, index)=>(<ContactsCard contact={item} key={`${item.name}->${index}`} />))}
          </View>
          <View style={styles.space}/>
        </Animated.ScrollView>
        <MainHeader {...{scrollY,scrollView}} navigate={props.navigation.navigate}/>   
      </View>
    </Screen>

  )
  
  
  
}

export default ContactsScreen;

