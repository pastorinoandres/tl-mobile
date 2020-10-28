import React, { useContext, useRef, useState, useEffect } from "react";
import { View, Dimensions, Alert, StyleSheet } from "react-native";
import { colors, ui, calculateSize, typography } from "../../../../shared/styles";
import Text from "../../../../shared/components/atoms/Text";
import { Screen } from "../../../../shared/components/organisms";
import Animated, { Easing } from "react-native-reanimated";
import { useSafeArea } from "react-native-safe-area-context";
import { Settings, ChangeMode } from "../../../../shared/vectors";
import useActions from "../../../../hooks/useActions";
import Contacts from "./../../../../shared/vectors/contacts";


import ContactsCard from "../ContactsScreen/ContactsCard";

const CategoryPreviewScreen = (props) => {
  const { login, logout } = useActions("login", "logout");

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

  /*const options = [
    {
      name: "Cambiar al  modo trabajador",
      Icon: ChangeMode,
      action: () => Alert.alert("hiciste click en la option"),
    },
    {
      name: "Configuración de la app",
      Icon: Settings,
      action: () => Alert.alert("hiciste click en la option"),
    },
    {
      name: "Importar contactos del celular",
      Icon: Contacts,
      action: () => Alert.alert("hiciste click en la option"),
    },
  ];*/

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

  const {
    route: { params },
  } = props;

  const { image, title, subtitle } = params;
  
  const insets = useSafeArea();

  const styles = StyleSheet.create({
    container: {
      flex:1,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.backgroundGrey.primary,
      paddingRight: '3%',
    },
    
    header: {
    //agregados mios!!!
      flex:1,
      backgroundColor:'red',
      marginLeft: '5%',
      marginTop: '-20%',
      minHeight:'20%',
    },
    catTitle: {
      textAlignVertical:'top',
      
    },
    //******** estos ya estaban
    space: {
      height: 210,
      width: "100%",
    },
    spaceInitial: {
      height:
        70 +
        insets.top +
        ui.margin +
        ui.padding +
        calculateSize(50) +
        ui.padding,
    },
    mainContainer: {
      marginTop: ui.padding,
    },
    title: {
      paddingLeft: ui.padding + ui.borderRadius.borderRadius / 2,
      textAlign: "left",
      marginBottom: ui.padding,
    },
  });

  return (
    <>
      <Screen {...props} //options={options} 
      initialAnimation>
        
        <View style={styles.container}> 
        <Animated.ScrollView
          onScroll={onScroll} 
          scrollEventThrottle ={1}
          ref={scrollView}>
          <View style={styles.spaceInitial}/>
          <View style={styles.header}>
            <Text extraStyles={styles.catTitle} {...typography['title-28']}> {`${title}`} </Text>
          </View>
          <View style={styles.mainContainer}>
              {contacts.recently.map((item, index)=>(<ContactsCard contact={item} key={`${item.name}->${index}`} />))}
              {contacts.all.map((item, index)=>(<ContactsCard contact={item} key={`${item.name}->${index}`} />))}
          </View>
          <View style={styles.space}/>
        </Animated.ScrollView>
        
      </View>
        
      </Screen>
    </>
  );
};

export default CategoryPreviewScreen;