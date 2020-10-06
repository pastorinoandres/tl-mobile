import React from "react";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import { Text } from "./../../../../shared/components/atoms";
import {
  colors,
  typography,
  ui,
  calculateSize,
} from "../../../../shared/styles";
import { useNavigation } from "@react-navigation/native";

const Categorias = () => {
  const navigation = useNavigation();

  const categorias = [
    {
      name: "Servicios para el hogar",
      servicios: [
        {
          image: require("../../../../../assets/categorias/jardinero.png"),
          title: "Jardineria",
          subtitle: "Deja tu parque reluciente",
        },
        {
          image: require("../../../../../assets/categorias/cuidador.png"),
          title: "Cuidado de personas",
          subtitle: "Mayores, con capacidades diferentes",
        },
        {
          image: require("../../../../../assets/categorias/limpieza.png"),
          title: "Limpieza",
          subtitle: "Deja tu casa brillando",
        },
      ],
    },
    {
      name: "Relacionados a la construción",
      servicios: [
        {
          image: require("../../../../../assets/categorias/albanil.png"),
          title: "Albañileria",
          subtitle: "Levanta paredes,...",
        },
        {
          image: require("../../../../../assets/categorias/carpintero.png"),
          title: "Carpinteria",
          subtitle: "Puertas, muebles, marcos..",
        },
        {
          image: require("../../../../../assets/categorias/electricista.png"),
          title: "Electricista",
          subtitle: "Iluminación, cableados, motores",
        },
        {
          image: require("../../../../../assets/categorias/herrero.png"),
          title: "Herreria",
          subtitle: "Todo tipo de estructuras... ",
        },
        {
          image: require("../../../../../assets/categorias/plomero.png"),
          title: "Plomeria",
          subtitle: "Repara tus perdidas",
        },
        {
          image: require("../../../../../assets/categorias/pintor.png"),
          title: "Pintor",
          subtitle: "Deja tu casa como nueva",
        },
      ],
    },
    {
      name: "Explora otros servicios",
      servicios: [
        {
          image: require("../../../../../assets/categorias/cerrajero.png"),
          title: "Cerrajero",
          subtitle: "Olvidaste la llave? Aqui la solucíon",
        },
        {
          image: require("../../../../../assets/categorias/fumigador.png"),
          title: "Fumigación",
          subtitle: "Olvidate de las plagas",
        },
        {
          image: require("../../../../../assets/categorias/agrimensor.png"),
          title: "Agrimensor",
          subtitle: "Encuentra todos los detalles ...",
        },
      ],
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
      width: calculateSize(180),
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
      height: calculateSize(50),
      justifyContent: "center",
      paddingHorizontal: ui.padding / 1.5,
    },
  };

  const openCategory = (category) => {
    return () => navigation.navigate("Agenda", category);
  };

  return (
    <>
      {categorias.map((categoria, index) => {
        return (
          <View
            style={styles.mainContainer}
            key={`${categoria.name}-index${index}`}
          >
            <Text
              {...typography["body-strong-18"]}
              color={colors.grey.t80}
              extraStyles={styles.title}
            >
              {categoria.name}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categoria.servicios.map((item, index) => {
                return (
                  <View
                    style={styles.cardContainer}
                    key={`${index})${item.title}`}
                  >
                    <TouchableOpacity
                      style={styles.touchable}
                      onPress={openCategory(item)}
                    >
                      <Image source={item.image} style={styles.image} />
                      <View style={styles.cardFooter}>
                        <Text
                          {...typography["body-strong-14"]}
                          color={colors.grey.t80}
                          extraStyles={{ textAlign: "center" }}
                        >
                          {item.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        );
      })}
    </>
  );
};

export default Categorias;
