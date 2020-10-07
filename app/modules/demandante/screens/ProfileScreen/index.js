import React, { useContext, useRef, useState, useEffect } from "react";
import { View, Dimensions, Alert } from "react-native";
import { colors, ui, calculateSize } from "../../../../shared/styles";
import Text from "../../../../shared/components/atoms/Text";
import { Screen } from "../../../../shared/components/organisms";
import Animated, { Easing } from "react-native-reanimated";
import { useSafeArea } from "react-native-safe-area-context";
import { Settings, ChangeMode } from "../../../../shared/vectors";
import useActions from "../../../../hooks/useActions";
import Contacts from "./../../../../shared/vectors/contacts";

const ProfileScreen = (props) => {
  const { login, logout } = useActions("login", "logout");

  const options = [
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
  ];

  const {
    route: { params },
  } = props;

  const { name, skill } = params;

  const insets = useSafeArea();

  const styles = {
    container: {
      flex: 1,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.backgroundGrey.primary,
    },
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
  };

  return (
    <Screen {...props} options={options} initialAnimation>
      <View style={styles.container}>
        <Text>{`Nombre: ${name}, Skill:${skill}`}</Text>
      </View>
    </Screen>
  );
};

export default ProfileScreen;
