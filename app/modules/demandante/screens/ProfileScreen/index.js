import React, { useContext, useRef, useState, useEffect } from "react";
import {
  View,
  Dimensions,
  Alert,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { colors, ui, calculateSize } from "../../../../shared/styles";
import Text from "../../../../shared/components/atoms/Text";
import {
  CardWithTitle,
  DataWorker,
} from "../../../../shared/components/molecules";
import { Screen } from "../../../../shared/components/organisms";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Settings, ChangeMode } from "../../../../shared/vectors";
import useActions from "../../../../hooks/useActions";
import Contacts from "./../../../../shared/vectors/contacts";
import { images } from "./../../../../utils/images";
import typography from "./../../../../shared/styles/typography";
import { Value } from "react-native-reanimated";
import { getRepTextAndColor } from "./utils/getRepTextAndColor";
import { Place, Skill } from "../../../../shared/vectors";
import * as Linking from "expo-linking";

const Item = ({ icon, name, action }) => {
  return (
    <TouchableWithoutFeedback onPress={action}>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 60,
            width: 60,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: ui.margin,
          }}
        >
          <Image source={icon} />
        </View>
        <Text {...typography["body-strong-14"]} color={colors.grey.t80}>
          {name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const ProfileScreen = (props) => {
  const { login, logout } = useActions("login", "logout");

  const {
    route: { params },
  } = props;

  const { image, name, skill, aboutMe, reputation, city, mobile } = params;

  const styles = {
    container: {
      flex: 1,
      width: "100%",
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: colors.backgroundGrey.primary,
    },
    containerCards: {
      width: "100%",
      justifyContent: "flex-start",
      alignItems: "center",

      paddingHorizontal: ui.padding,
    },
    portada: {
      width: "100%",
      resizeMode: "cover",
      height: 220,
      opacity: 0.6,
    },
    photo: {
      position: "relative",
      top: -80,
      height: 160,
      width: 160,
      resizeMode: "cover",
      overflow: "hidden",
      borderRadius: 80,
    },
    line: {
      flexDirection: "row",
      width: "100%",
      marginVertical: ui.padding / 3,
      alignItems: "center",
    },
    iconCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    textIcon: {
      color: colors.white(1),
    },
    text: {
      position: "absolute",
      top: 50,
      left: 30,
    },
    description: {
      position: "relative",
      top: -60,
      textAlign: "center",
      paddingHorizontal: ui.padding * 2,
    },
    subtitles: {
      position: "relative",
      top: -40,
      textAlign: "left",
    },
    scrollView: {
      width: "100%",
      top: -40,
      position: "relative",
    },
  };

  const { descripcion, color } = getRepTextAndColor(reputation);

  const dataWorkerList = [
    {
      text: descripcion,
      icon: {
        isIcon: false,
        content: reputation,
        color,
      },
    },
    {
      text: `Vive en ${city}`,
      icon: {
        isIcon: true,
        content: Place,
        color: colors.grey.t60,
      },
    },
    {
      text: `Trabaja en ${skill}`,
      icon: {
        isIcon: true,
        content: Skill,
        color: colors.grey.t60,
      },
    },
  ];

  const openDeepLink = (url) => {
    Linking.openURL(url);
  };
  const options = [
    {
      name: "Demandar al trabajador",
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
  ];

  const medios = [
    {
      name: "WHATSAPP",
      Icon: images.icon_whatsapp,
      action: () =>
        openDeepLink(
          `https://wa.me/${mobile}?text=Hola%20te%20vi%20por%20TuLaburo!`
        ),
    },
    {
      name: "SMS",
      Icon: images.icon_sms,
      action: () => Alert.alert("Accediendo a envío de SMS"),
    },
    {
      name: "LLAMADA",
      Icon: images.icon_telefono,
      action: () => Alert.alert("Accediendo a realizar llamada"),
    },
  ];

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.portada} />
      <Image source={image} style={styles.photo} />
      <Text
        {...typography["title-32"]}
        color={colors.grey.t80}
        extraStyles={styles.description}
      >
        {name}
      </Text>
      <View style={styles.containerCards}>
        <ScrollView style={styles.scrollView}>
          <CardWithTitle title="Datos del Trabajador">
            {dataWorkerList.map((element, index) => {
              const {
                text,
                icon: { isIcon, content: Content, color },
              } = element;
              return (
                <View key={index + text} style={styles.line}>
                  <View
                    style={{ ...styles.iconCircle, backgroundColor: color }}
                  >
                    {isIcon ? (
                      <Content />
                    ) : (
                      <Text extraStyles={styles.textIcon}>{Content}</Text>
                    )}
                  </View>
                  <Text>{text}</Text>
                </View>
              );
            })}
          </CardWithTitle> 
          <CardWithTitle title="Medios de Contacto">
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-around",
                paddingHorizontal: ui.margin * 2,
              }}
            >
              {medios.map(({ name, Icon, action }) => (
                <Item key={name} name={name} icon={Icon} action={action} />
              ))}
            </View>
          </CardWithTitle>
        </ScrollView>
      </View>
    </View>
  );
};

export default ProfileScreen;
