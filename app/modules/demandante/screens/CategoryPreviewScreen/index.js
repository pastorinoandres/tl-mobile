import React from "react";
import { View, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ContactsCard from "../ContactsScreen/ContactsCard";
import { colors, typography, } from "../../../../shared/styles";
import categoriasStyles from "./styles";
import { Text } from "./../../../../shared/components/atoms";
//import users from "../../../../mocks/users";

const CategoryPreviewScreen = (props) => {
  const { image, title, subtitle } = props.route.params
  
  const styles ={
    catTitle: {
      textAlignVertical: "top",
      position: "absolute",
      paddingTop: ui.padding,
      color: colors.black(0.7),
      paddingLeft: ui.padding + ui.borderRadius.borderRadius / 2,
      textAlign: "left",
    },
  }

  return (
    <View {...categoriasStyles.container}>
      <ScrollView scrollEventThrottle={1}>
        <View {...categoriasStyles.spaceInitial}>
          <Image source={image} {...categoriasStyles.catImag}/>
          <LinearGradient {...categoriasStyles.degradado} {...colors.greyGradient} />
          <Text extraStyles={styles.catTitle} {...typography["title-28"]}> {`${title}`} </Text>

          <View {...categoriasStyles.mainContainer}>
          
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
 
export default CategoryPreviewScreen;