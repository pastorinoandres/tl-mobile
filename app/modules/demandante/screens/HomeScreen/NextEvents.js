import React, { useContext, useState, useEffect, useRef } from "react";
import {
  View,
  Dimensions,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { typography, colors, ui } from "../../../../shared/styles";
import Text from "../../../../shared/components/atoms/Text";
import { Screen } from "../../../../shared/components/organisms";
import { Button } from "../../../../shared/components/molecules";
import { AnimationSync } from "../../../../animations";
import Animated, { Easing } from "react-native-reanimated";
import { useSafeArea } from "react-native-safe-area-context";
import { HamburgerMenu } from "../../../../shared/components/organisms";
import {
  Settings,
  ChangeMode,
  ShareAction,
  GiveFeedback,
  SignOut,
  Pedidos as PedidosIcon,
} from "../../../../shared/vectors";
import useActions from "../../../../hooks/useActions";
import { LinearGradient } from "expo-linear-gradient";
import { Thumbnail } from "../../../../shared/components/atoms";
import { images } from "./../../../../utils/images";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
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
  concat,
  createAnimatedComponent,
} = Animated;

const Timeline = createAnimatedComponent(LinearGradient);

const NextEvents = () => {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
    }).start();

    Animated.timing(scale, {
      toValue: 1,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    }).start();
  }, []);

  const items = [
    {
      hour: "16:00hs",
      icon: images.icon_jardinero,
      name: "Corte de pasto",
    },
    {
      hour: "Mañana",
      icon: images.icon_plomero,
      name: "Cambio de cuerito",
    },
    {
      hour: "Jueves",
      icon: images.icon_marketing,
      name: "Campaña de marketing",
    },
  ];

  const styles = {
    container: {
      paddingHorizontal: ui.padding,
      overflow: "hidden",
      transform: [{ scale }],
    },
    card: {
      backgroundColor: colors.white(1),
      height: 260,
      width: "100%",
      ...ui.borderRadius,
      padding: ui.padding,
    },
    timeline: {
      width: 3,
      height: 260,
      position: "absolute",
      left: windowWidth * 0.25,
      bottom: 0,
      opacity,
    },
    events: {
      justifyContent: "flex-end",
      alignItems: "flex-start",
      opacity,
    },
    itemContainer: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      height: 50,
      marginBottom: 10,
    },
    indicator: (index) => ({
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: index ? colors.grey.t60 : colors.grey.t80,
    }),
  };

  return (
    <Animated.View style={styles.container}>
      <View style={styles.card}>
        <Timeline style={styles.timeline} {...colors.timeline} />
        <Text
          {...typography["title-20"]}
          color={colors.grey.t80}
          extraStyles={{ textAlign: "left", marginBottom: 30 }}
        >
          A continuación
        </Text>
        <Animated.View style={styles.events}>
          {items.map((item, index) => {
            return (
              <View style={styles.itemContainer} key={`${index}-${item.name}`}>
                <Text
                  {...typography[index ? "body-14" : "body-strong-14"]}
                  color={colors.grey.t80}
                  extraStyles={{
                    textAlign: "left",
                    width: 0.25 * windowWidth - ui.padding - 4.5,
                  }}
                >
                  {item.hour}
                </Text>
                <View style={styles.indicator(index)}></View>
                <Thumbnail
                  source={item.icon}
                  size={25}
                  shape="square"
                  extraStyles={{ marginHorizontal: 20 }}
                />
                <Text
                  {...typography[index ? "body-16" : "body-strong-16"]}
                  color={colors.grey.t80}
                  extraStyles={{ textAlign: "left" }}
                >
                  {item.name}
                </Text>
              </View>
            );
          })}
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export default NextEvents;
