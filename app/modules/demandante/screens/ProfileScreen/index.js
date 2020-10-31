import React, { useContext, useRef, useState, useEffect } from "react";
import {
  View,
  Dimensions,
  Alert,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { colors, ui, calculateSize } from "../../../../shared/styles";
import Text from "../../../../shared/components/atoms/Text";
import { Screen } from "../../../../shared/components/organisms";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Settings, ChangeMode } from "../../../../shared/vectors";
import useActions from "../../../../hooks/useActions";
import Contacts from "./../../../../shared/vectors/contacts";
import { images } from "./../../../../utils/images";
import typography from "./../../../../shared/styles/typography";

const Item = ({ icon, name, action }) => {
  return (
    <TouchableWithoutFeedback onPress={action}>
      <View>
        <View
          style={{
            height: 80,
            width: 80,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.white(1),
            borderRadius: 45,
            ...ui.shadow,
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
      action: () => Alert.alert("Accediendo a Whatsapp"),
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

  const {
    route: { params },
  } = props;

  const { image, name, skill, aboutMe } = params;

  const insets = useSafeAreaInsets();

  const styles = {
    container: {
      flex: 1,
      width: "100%",
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: colors.backgroundGrey.primary,
    },
    portada: {
      width: "100%",
      resizeMode: "cover",
      height: 300,
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
  };

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.portada} />
      <Text
        {...typography["title-28"]}
        color={colors.white(1)}
        extraStyles={styles.text}
      >
        {name}
      </Text>
      <Image source={image} style={styles.photo} />
      <Text
        {...typography["body-16"]}
        color={colors.grey.t60}
        extraStyles={styles.description}
      >
       {aboutMe}
      </Text>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
          paddingHorizontal: ui.margin * 2,
          position: "relative",
          top: -40,
        }}
      >
        {medios.map(({ name, Icon, action }) => (
          <Item name={name} icon={Icon} action={action} />
        ))}
      </View>
    </View>
  );
};

export default ProfileScreen;
