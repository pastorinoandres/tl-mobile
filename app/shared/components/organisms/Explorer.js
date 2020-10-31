import React, { useState, Fragment } from "react";
import {
  ScrollView,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { Text, Line, Card } from "../atoms";
import { BottomMenu } from "../molecules";
import { colors, typography, ui, calculateSize } from "../../styles";
import { images } from "./../../../utils/images";

const { height } = Dimensions.get("window");
const flagDefault = images.flagDefault;

Item = (item) => {
  const styles = {
    touchable: {
      marginVertical: calculateSize(5),
    },
    row: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingVertical: calculateSize(15),
    },
    text: {
      paddingLeft: calculateSize(15),
      textAlign: "right",
    },
    image: {
      height: calculateSize(24),
      width: calculateSize(24),
    },
  };

  return (
    <TouchableOpacity style={styles.touchable} onPress={item.onPress}>
      <View style={styles.row}>
        <Image
          style={styles.image}
          source={{ uri: item.image }}
          defaultSource={flagDefault}
        />

        <Text
          {...typography["body-16"]}
          color={colors.grey.t80}
          extraStyles={styles.text}
        >
          {item.title}
        </Text>
      </View>

      <Line color={colors.grey.t10} />
    </TouchableOpacity>
  );
};

SearchInput = ({ value, setValue }) => {
  //Estilos
  const styles = {
    textInput: {
      ...typography["body-16"].typography,
      height: 50,
      width: "100%",
      paddingLeft: 15,
      flex: 1,
      color: colors.grey.t80,
      textAlign: "left",
    },
    card: {
      paddingHorizontal: 0,
      paddingVertical: 0,
      marginBottom: calculateSize(20),
    },
  };

  return (
    <Card height={calculateSize(50)} style={styles.card}>
      <TextInput
        style={styles.textInput}
        placeholder={"Buscar"}
        placeholderTextColor={colors.grey.t40}
        value={value}
        onChangeText={setValue}
      />
    </Card>
  );
};

const List = (props) => {
  const { title, list, toDown } = props;

  //Estado interno
  const [value, setValue] = useState("");

  //Facilito el ingreso de las props al SearchInput
  const searchProps = { value, setValue };

  //Estilos
  const styles = {
    marginBottom: calculateSize(20),
    marginTop: calculateSize(10),
    textAlign: "left",
  };

  const filteredList = props.list.filter((item) => {
    return item.title.includes(value);
  });

  return (
    <Fragment>
      <Text
        {...typography["title-20"]}
        color={colors.acento.primary}
        extraStyles={styles}
      >
        {title}
      </Text>
      <SearchInput {...searchProps} />
      <FlatList
        data={filteredList}
        renderItem={({ item }) => (
          <Item
            title={item.title}
            image={item.image}
            onPress={() => {
              item.onPress();
              toDown();
            }}
          />
        )}
        keyExtractor={(item) => item.title}
      />
    </Fragment>
  );
};

const Explorer = ({ menu, toogleMenu, list, title }) => {
  //Estilos
  const styles = {
    paddingHorizontal: ui.padding,
    paddingBottom: 0,
  };

  const listProps = {
    list,
    title,
  };

  return (
    <BottomMenu
      menu={menu}
      toogleMenu={toogleMenu}
      contentSize={height * 0.9}
      extraStyles={styles}
    >
      <List {...listProps} />
    </BottomMenu>
  );
};

export default Explorer;
