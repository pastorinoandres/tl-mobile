import React from "react";
import { View, Image, Dimensions } from "react-native";
import {
  typography,
  colors,
  ui,
  calculateSize,
} from "../../../../shared/styles";
import Text from "../../../../shared/components/atoms/Text";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "./../../../../utils/images";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const Covid = () => {
  const styles = {
    covid: {
      height: calculateSize(140),
      width: windowWidth - ui.padding * 2,
      marginHorizontal: ui.padding,
      padding: ui.padding,
      flexDirection: "row",
      ...ui.borderRadius,
      marginBottom: ui.padding,
    },
  };

  return (
    <LinearGradient style={styles.covid} {...colors.demandanteGradient}>
      <View style={{ justifyContent: "flex-end", flex: 3 }}>
        <Image source={images.icon_covid} />
      </View>
      <View style={{ justifyContent: "space-between", flex: 7 }}>
        <Text
          {...typography["body-16"]}
          color={colors.white(1)}
          extraStyles={{ textAlign: "right" }}
        >
          {" "}
          Dada la situación actual algunos servicios se encuentran demorados.
        </Text>
        <Text
          {...typography["body-strong-16"]}
          color={colors.white(1)}
          extraStyles={{ textAlign: "right" }}
        >
          {" "}
          COVID-19
        </Text>
      </View>
    </LinearGradient>
  );
};

export default Covid;
