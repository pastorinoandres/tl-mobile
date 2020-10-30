import React from "react";
import { colors, ui } from "../../../../shared/styles";
import Animated from "react-native-reanimated";
import { useSafeArea } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "./../../../../utils/images";

const { Extrapolate, interpolate } = Animated;

const Portada = ({ scrollY }) => {
  const insets = useSafeArea();
  const distance = 150 + insets.top + ui.margin + ui.padding;

  const topPortada = interpolate(scrollY, {
    inputRange: [0, distance],
    outputRange: [0, -distance],
    extrapolateLeft: Extrapolate.CLAMP,
  });

  const heightImage = interpolate(scrollY, {
    inputRange: [-200, 0],
    outputRange: [600, 300],
    extrapolateRight: Extrapolate.CLAMP,
  });

  const styles = {
    image: {
      width: "100%",
      height: heightImage,
    },
    degradado: {
      position: "absolute",
      width: "100%",
      height: "100%",
    },
    portada: {
      width: "100%",
      position: "absolute",
      top: topPortada,
      left: 0,
      right: 0,
    },
  };

  return (
    <Animated.View style={styles.portada}>
      <Animated.Image source={images.portada} style={styles.image} />
      <LinearGradient style={styles.degradado} {...colors.greyGradient} />
    </Animated.View>
  );
};

export default Portada;
