import React, { useContext } from "react";
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
} = Animated;

const Gastos = () => {
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
      marginTop: ui.padding,
    },
    card: {
      backgroundColor: colors.white(1),
      height: 140,
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
    },
    events: {
      justifyContent: "flex-end",
      alignItems: "flex-start",
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
    <View style={styles.container}>
      <View style={styles.card}>
        <Text
          {...typography["title-20"]}
          color={colors.grey.t80}
          extraStyles={{ textAlign: "left", marginBottom: 30, width: "100%" }}
        >
          Gastos de Abril
        </Text>
        <Text
          {...typography["body-16"]}
          color={colors.grey.t60}
          extraStyles={{ textAlign: "left", marginBottom: 30, width: "100%" }}
        >
          No se registran gastos en el mes corriente.
        </Text>
      </View>
    </View>
  );
};

export default Gastos;
