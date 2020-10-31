import React from "react";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import { Text } from "./../../../../shared/components/atoms";
import {
  colors,
  typography,
  ui,
  calculateSize,
} from "../../../../shared/styles";
import { images } from "./../../../../utils/images";

const NuestrasSugerencias = () => {
  const sugerencias = [
    {
      image: images.sugerencias_a,
      title: "Pinta tu habitación",
      subtitle: "Renueva tus ambientes",
      tag: "Lo más pedido",
    },
    {
      image: images.sugerencias_b,
      title: "Instala tu aire acondicionado",
      subtitle: "Preparate para la próxima estación.",
      tag: "Visto recientemente",
    },
    {
      image: images.sugerencias_c,
      title: "Adiestra a tu perro",
      subtitle: "La mejor decisición para tu mascota",
      tag: "Recomendado",
    },
  ];

  const styles = {
    mainContainer: {
      marginTop: ui.padding * 2,
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
      width: calculateSize(300),
      aspectRatio: 330 / 400,
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
      height: calculateSize(80),
      justifyContent: "space-around",
      padding: ui.padding,
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

  return (
    <View style={styles.mainContainer}>
      <Text
        {...typography["body-strong-18"]}
        color={colors.grey.t80}
        extraStyles={styles.title}
      >
        Nuestras sugerencias
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {sugerencias.map((item, index) => {
          return (
            <View
              style={styles.cardContainer}
              key={`${item.title}-tag${item.tag}-index${index}`}
            >
              <TouchableOpacity style={styles.touchable}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.cardFooter}>
                  <Text
                    {...typography["body-strong-16"]}
                    color={colors.grey.t80}
                    extraStyles={{ textAlign: "left" }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    {...typography["body-14"]}
                    color={colors.grey.t60}
                    extraStyles={{ textAlign: "left" }}
                  >
                    {item.subtitle}
                  </Text>
                </View>
                <View style={styles.cardTag}>
                  <Text {...typography["caption-12"]} color={colors.white(1)}>
                    {item.tag}
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

export default NuestrasSugerencias;
