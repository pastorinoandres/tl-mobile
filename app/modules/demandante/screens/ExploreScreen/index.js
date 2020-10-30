import React, { useRef, useEffect, useState } from "react";
import { Alert, InteractionManager, View } from "react-native";
import { colors, ui } from "../../../../shared/styles";
import { Screen } from "../../../../shared/components/organisms";
import Animated from "react-native-reanimated";
import { HamburgerMenu } from "../../../../shared/components/organisms";
import {
  Settings,
  ChangeMode,
  ShareAction,
  GiveFeedback,
  SignOut,
  Search,
} from "../../../../shared/vectors";
import useActions from "../../../../hooks/useActions";
import SearchBox from "./SearchBox";
import H1 from "./H1";
import Header from "./Header";
import Portada from "./Portada";
import ScrollList from "./ScrollList";

const ExploreScreen = (props) => {
  const scrollView = useRef(null);
  const scrollY = useRef(new Animated.Value()).current;
  const { logout } = useActions("login", "logout");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setReady(true);
    });
  }, []);

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
      name: "Cerrar sessión",
      Icon: SignOut,
      action: () => logout(),
    },
  ];

  const styles = {
    container: {
      flex: 1,
      width: "100%",
      justifyContent: "flex-start",
      backgroundColor: "colors.backgroundGrey.primary",
    },
    hamburgerMenu: {
      position: "absolute",
      top: 40,
      right: ui.padding,
    },
  };
  return (
    <>
      {ready ? (
        <Screen {...props} options={options}>
          <Animated.View style={styles.container}>
            <ScrollList {...{ scrollY, scrollView }} />
            <Portada {...{ scrollY }} />
            <H1 {...{ scrollY }} />
            {/*<SearchBox scrollY={scrollY}/>*/}
            <Header {...{ scrollY, scrollView }} />
            <HamburgerMenu
              style={styles.hamburgerMenu}
              animatedColor={colors.white(1)}
            />
          </Animated.View>
        </Screen>
      ) : (
        <View></View>
      )}
    </>
  );
};

export default ExploreScreen;
