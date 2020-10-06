import React, { useContext, useState } from "react";
import {
  View,
  Dimensions,
  Alert,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import {
  typography,
  colors,
  ui,
  calculateSize,
} from "../../../../shared/styles";
import Text from "../../../../shared/components/atoms/Text";
import { Screen } from "../../../../shared/components/organisms";
import { Button } from "../../../../shared/components/molecules";
import { AnimationSync } from "../../../../animations";
import Animated, { Easing } from "react-native-reanimated";
import { useSafeArea } from "react-native-safe-area-context";
import { HamburgerMenu } from "../../../../shared/components/organisms";
import useActions from "../../../../hooks/useActions";
import { LinearGradient } from "expo-linear-gradient";
import { Thumbnail } from "../../../../shared/components/atoms";
import { Store } from "../../../../shared/vectors";
import { EXPLORE } from "../../../../navigation/constants";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const {
  Extrapolate,
  useCode,
  call,
  Value,
  color,
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
  lessThan,
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

const TouchableAnimated = createAnimatedComponent(TouchableWithoutFeedback);

const MainHeader = ({ scrollY, navigate, scrollView }) => {
  const insets = useSafeArea();

  const defaultCallToAction = () => navigate(EXPLORE);
  const goInitial = () => {
    if (scrollView.current) {
      scrollView.current.getNode().scrollTo({ y: 0 });
    }
  };

  const distance = 70 + insets.top + ui.margin + ui.padding;

  const trayecto = [0, distance - 15, distance + 15];

  const button = {
    initial: {
      top: distance,
      height: calculateSize(50),
      radius: ui.borderRadius.borderRadius,
    },
  };

  const opacity = interpolate(scrollY, {
    inputRange: trayecto,
    outputRange: [1, 0, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const topHeader = interpolate(scrollY, {
    inputRange: trayecto,
    outputRange: [0, -distance, -distance],
    extrapolateRight: Extrapolate.CLAMP,
  });

  const opacityHeader = interpolate(scrollY, {
    inputRange: trayecto,
    outputRange: [0, 0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  const opacityMenu = interpolate(scrollY, {
    inputRange: [0, distance - 15, distance + 15],
    outputRange: [1, 0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  const topButton = interpolate(scrollY, {
    inputRange: trayecto,
    outputRange: [button.initial.top, 0, 0],
    extrapolateRight: Extrapolate.CLAMP,
  });

  const paddingButton = interpolate(scrollY, {
    inputRange: trayecto,
    outputRange: [ui.padding, ui.padding, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const heightButton = interpolate(scrollY, {
    inputRange: trayecto,
    outputRange: [
      button.initial.height,
      button.initial.height,
      insets.top + 60,
    ],
    extrapolate: Extrapolate.CLAMP,
  });

  const radiusButton = interpolate(scrollY, {
    inputRange: trayecto,
    outputRange: [button.initial.radius, button.initial.radius, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const red = interpolate(scrollY, {
    inputRange: trayecto,
    outputRange: [18, 18, 255],
    extrapolate: Extrapolate.CLAMP,
  });

  const green = interpolate(scrollY, {
    inputRange: trayecto,
    outputRange: [116, 116, 255],
    extrapolate: Extrapolate.CLAMP,
  });

  const blue = interpolate(scrollY, {
    inputRange: trayecto,
    outputRange: [186, 186, 255],
    extrapolate: Extrapolate.CLAMP,
  });

  const translateY = interpolate(scrollY, {
    inputRange: trayecto,
    outputRange: [-200, -200, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const animatedColor = color(red, green, blue, 1);

  const styles = {
    title: {
      width: "100%",
      height: 70 + insets.top + ui.margin + ui.padding,
      paddingTop: insets.top + ui.margin,
      paddingBottom: ui.margin,
      backgroundColor: "transparent",
      alignItems: "flex-start",
      justifyContent: "center",
      paddingHorizontal: ui.padding,
      position: "absolute",
      top: topHeader,
      opacity,
    },
    button: {
      width: "100%",
      height: heightButton,
      backgroundColor: colors.demandantes.primary,
      borderRadius: radiusButton,
      ...ui.shadow,
    },
    touchable: {
      position: "absolute",
      top: topButton,
      width: "100%",
      paddingHorizontal: paddingButton,
    },
    buttonContain: {
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      opacity,
    },
    header: {
      height: "100%",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      paddingTop: insets.top,
      opacity: opacityHeader,
    },
  };

  return (
    <>
      <Animated.View style={styles.title}>
        <Text
          {...typography["title-28"]}
          color={colors.demandantes.primary}
          extraStyles={{ textAlign: "left" }}
        >
          {" "}
          Hola Andres,
        </Text>
        <Text
          {...typography["body-20"]}
          color={colors.grey.t80}
          extraStyles={{ textAlign: "left" }}
        >
          {" "}
          ¡Que tengas un excelente dia!
        </Text>
      </Animated.View>

      <Animated.View style={styles.touchable}>
        <Animated.View style={styles.button}>
          <TouchableAnimated onPress={defaultCallToAction}>
            <Animated.View style={styles.buttonContain}>
              <Store
                color={colors.white(1)}
                extraStyles={{ marginRight: ui.margin }}
              />
              <Text
                {...typography["body-20"]}
                color={colors.white(1)}
                extraStyles={{ textAlign: "center" }}
              >
                {" "}
                Pedir un servicio
              </Text>
            </Animated.View>
          </TouchableAnimated>
          <TouchableAnimated onPress={goInitial}>
            <Animated.View
              style={{ ...styles.header, transform: [{ translateY }] }}
            >
              <Text
                {...typography["title-20"]}
                color={colors.white(1)}
                extraStyles={{ textAlign: "center" }}
              >
                {" "}
                Inicio
              </Text>
            </Animated.View>
          </TouchableAnimated>
        </Animated.View>
      </Animated.View>

      <HamburgerMenu
        style={{
          position: "absolute",
          top: 40,
          right: ui.padding,
          opacity: opacityMenu,
        }}
        animatedColor={animatedColor}
      />
    </>
  );
};

export default MainHeader;
