//Dependecies
import React, { useState } from "react";
import {
  Dimensions,
  View,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import Animated from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

//Components
import { Thumbnail, Text } from "../../atoms";
//Styles
import { colors, typography, ui, calculateSize } from "../../../styles";
import { images } from "./../../../../utils/images";

const { Extrapolate, interpolate, createAnimatedComponent } = Animated;

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const notifications = [
  {
    title: "Alejandro Di Luca",
    message: "Te envio una propuesta para perdida en el inodoro",
    Icon: images.user_alejandro,
    viewed: false,
  },
  {
    title: "Mariano Busti",
    message: "Te envio una propuesta para diseño de TuLaburo",
    Icon: images.user_mariano,
    viewed: false,
  },
  {
    title: "Alejandro Di Luca",
    message: "Te envio una propuesta para perdida en el inodoro",
    Icon: images.user_alejandro,
    viewed: true,
  },
  {
    title: "Mariano Busti",
    message: "Te envio una propuesta para diseño de TuLaburo",
    Icon: images.user_mariano,
    viewed: true,
  },
  {
    title: "Alejandro Di Luca",
    message: "Te envio una propuesta para perdida en el inodoro",
    Icon: images.user_alejandro,
    viewed: true,
  },
  {
    title: "Mariano Busti",
    message: "Te envio una propuesta para diseño de TuLaburo",
    Icon: images.user_mariano,
    viewed: true,
  },
  {
    title: "Alejandro Di Luca",
    message: "Te envio una propuesta para perdida en el inodoro",
    Icon: images.user_alejandro,
    viewed: true,
  },
  {
    title: "Mariano Busti",
    message: "Te envio una propuesta para diseño de TuLaburo",
    Icon: images.user_mariano,
    viewed: true,
  },
  {
    title: "Alejandro Di Luca",
    message: "Te envio una propuesta para perdida en el inodoro",
    Icon: images.user_alejandro,
    viewed: true,
  },
  {
    title: "Mariano Busti",
    message: "Te envio una propuesta para diseño de TuLaburo",
    Icon: images.user_mariano,
    viewed: true,
  },
];

const Notifications = ({
  setHeightTitle,
  anchor,
  setAnchor,
  scrollY,
  translationX,
}) => {
  const heightItem = 110 + ui.margin;

  const calculateTranslateX = (index) => {
    return interpolate(translationX, {
      inputRange: [-0.8 * windowWidth, 0],
      outputRange: [0, windowWidth * 0.2 * (index + 1)],
      extrapolate: Extrapolate.CLAMP,
    });
  };

  const calculateOpacity = (index) => {
    const points = {
      initial: anchor + heightItem * index,
      middle: anchor + heightItem * index + heightItem / 2,
      final: anchor + heightItem * (index + 1) + 50,
    };

    return interpolate(scrollY, {
      inputRange: [points.initial, points.middle, points.final],
      outputRange: [1, 0.9, 0],
      extrapolate: Extrapolate.CLAMP,
    });
  };

  const opacity = interpolate(scrollY, {
    inputRange: [0, 30],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const styles = {
    container: {
      width: "100%",
    },
    title: {
      textAlign: "left",
      paddingBottom: ui.padding * 2,
      opacity,
      zIndex: 1,
    },
    card: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      paddingVertical: ui.padding,
      paddingHorizontal: 0,
      backgroundColor: colors.white(),
      ...ui.borderRadius,
      width: "100%",
      height: "100%",
    },
    border: (viewed) => ({
      marginBottom: ui.margin,
      alignItems: "center",
      justifyContent: "center",
      padding: 2,
      flex: 1,
      height: 110,
      ...ui.borderRadius,
      ...ui.shadow,
      opacity: viewed ? 0.9 : 1,
    }),
    touchable: (index) => ({
      opacity: calculateOpacity(index),
      transform: [{ translateX: calculateTranslateX(index) }],
    }),
  };
  const gradientColor = (viewed) =>
    viewed ? colors.none : colors.notification;

  const onLayout = ({
    nativeEvent: {
      layout: { x, y, width, height },
    },
  }) => {
    setAnchor(y);
  };

  const onLayoutTitle = ({
    nativeEvent: {
      layout: { x, y, width, height },
    },
  }) => {
    setHeightTitle(height - ui.padding * 2);
  };

  const CardTouchable = createAnimatedComponent(TouchableWithoutFeedback);

  return (
    <View style={styles.container} {...{ onLayout }}>
      <Text
        {...typography["title-20"]}
        color={colors.white()}
        extraStyles={styles.title}
        animated
        onLayout={onLayoutTitle}
      >
        Notificaciones
      </Text>

      {notifications.map((Option, index) => (
        <CardTouchable
          key={index}
          style={styles.touchable(index)}
          onPress={() => Alert.alert("hiciste click enla notificacion")}
        >
          <LinearGradient
            style={styles.border(Option.viewed)}
            {...gradientColor(Option.viewed)}
            key={index}
          >
            <View style={styles.card}>
              <View
                style={{
                  paddingHorizontal: ui.padding,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Thumbnail source={Option.Icon} size={44} />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  backgroundColor: "transparent",
                }}
              >
                <Text
                  {...typography["body-strong-18"]}
                  color={colors.grey.t80}
                  extraStyles={{
                    textAlign: "left",
                    marginBottom: ui.padding * 0.3,
                  }}
                >
                  {Option.title}
                </Text>
                <Text
                  {...typography["body-16 "]}
                  color={colors.grey.t80}
                  extraStyles={{ textAlign: "left" }}
                >
                  {Option.message}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </CardTouchable>
      ))}
    </View>
  );
};

export default Notifications;
