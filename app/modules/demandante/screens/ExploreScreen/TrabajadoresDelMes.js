import React from "react";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import { Text } from "./../../../../shared/components/atoms";
import {
  colors,
  typography,
  ui,
  calculateSize,
} from "../../../../shared/styles";
import { useNavigation } from "../../../../hooks";
import { PROFILE } from "../../../../navigation/constants";
import { images } from "./../../../../utils/images";

const TrabajadoresDelMes = () => {
  const navigation = useNavigation();
  const trabajadores = [
    {
      photo: images.trabajadores_a,
      name: "Juan",
      skill: "Albañil",
      aboutMe: "Soy albañil y me dedico a la construcción pesada.",
    },
    {
      photo: images.trabajadores_b,
      name: "Maria",
      skill: "Electricista",
      aboutMe: "Me dedico a realizar instalaciones domiciliarias como comerciales.",
    },
    {
      photo: images.trabajadores_c,
      name: "Sebastian",
      skill: "Herrero",
      aboutMe: "Realizo cualquier estructura de metálica usted necesite.",
    },
  ];

  const styles = {
    mainContainer: {
      marginTop: ui.padding,
    },
    title: {
      paddingLeft: ui.padding + ui.borderRadius.borderRadius / 2,
      textAlign: "left",
      marginBottom: ui.padding * 0.5,
    },
    cardContainer: {
      paddingLeft: ui.padding,
      textAlign: "left",
      marginVertical: ui.padding,
      width: calculateSize(160),
      aspectRatio: 170 / 360,
      ...ui.shadowBlur,
    },
    touchable: {
      ...ui.borderRadius,
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: "100%",
    },
    cardFooter: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.white(0.98),
      height: calculateSize(70),
      justifyContent: "space-around",
      padding: ui.padding / 1.5,
    },
    cardTag: {
      position: "absolute",
      top: ui.margin,
      right: ui.margin,
      backgroundColor: colors.demandantes.secondary,
      flex: 0,
      height: 30,
      borderRadius: 15,
      paddingHorizontal: 15,
      justifyContent: "center",
    },
  };

  const openProfile = (trabajador) => {
    return () => {
      navigation.navigate(PROFILE, trabajador);
    };
  };

  return (
    <View style={styles.mainContainer}>
      <Text
        {...typography["body-strong-18"]}
        color={colors.grey.t80}
        extraStyles={styles.title}
      >
        Trabajadores destacados
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {trabajadores.map((item) => {
          return (
            <View
              style={styles.cardContainer}
              key={`${item.name}-${item.skill}`}
            >
              <TouchableOpacity
                style={styles.touchable}
                onPress={openProfile(item)}
              >
                <Image source={item.photo} style={styles.image} />
                <View style={styles.cardFooter}>
                  <Text
                    {...typography["body-strong-16"]}
                    color={colors.grey.t80}
                  >
                    {item.name}
                  </Text>
                  <Text {...typography["body-14"]} color={colors.grey.t60}>
                    {item.skill}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TrabajadoresDelMes;
