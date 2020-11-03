

// import React, { useContext, useRef, useState, useEffect } from "react";
// import {
//   View,
//   Dimensions,
//   Alert,
//   StyleSheet,
//   Image,
//   ScrollView,
// } from "react-native";
// import {
//   colors,
//   ui,
//  calculateSize,
// typography,
// } from "../../../../shared/styles";
// import Text from "../../../../shared/components/atoms/Text";
// import { Screen } from "../../../../shared/components/organisms";
// import Animated, { Easing } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { Settings, ChangeMode } from "../../../../shared/vectors";
// import useActions from "../../../../hooks/useActions";


// //los que agregue yo
// import { LinearGradient } from "expo-linear-gradient";
// //import MainHeader from './MainHeader';
// import ContactsCard from "../ContactsScreen/ContactsCard";
// import { images } from "./../../../../utils/images";

// const CategoryPreviewScreen = (props) => {
//   const contacts = {
//     
//   };

//   const {
//     route: { params },
//   } = props;

//   const { image, title, subtitle } = params;

//   const insets = useSafeAreaInsets();

//   const styles = StyleSheet.create({
//     container: {
//       width: "95%",
//       justifyContent: "flex-start",
//       alignItems: "center",
//       backgroundColor: colors.backgroundGrey.primary,
//     },
//     catImag: {
//       width: "100%",
//       height: 250,
//       borderRadius: 10,
//     },
//     catTitle: {
//       textAlignVertical: "top",
//       position: "absolute",
//       color: "rgba(255,255,255,0.95)",
//     },
//     degradado: {
//       position: "absolute",
//       width: "100%",
//       height: "100%",
//     },
//     space: {
//       height: 50,
//       width: "100%",
//     },
//     spaceInitial: {
//       marginTop: "10%",
//       marginLeft: "5%",
//     },
//     mainContainer: {
//       marginTop: ui.padding,
//     },
//     title: {
//       paddingLeft: ui.padding + ui.borderRadius.borderRadius / 2,
//       textAlign: "left",
//       marginBottom: ui.padding,
//     },
//   });

//   return (
//     <View style={styles.container}>
//       <ScrollView scrollEventThrottle={1}>
//         <View style={styles.spaceInitial}>
//           <Image source={image} style={styles.catImag}></Image>
//           <LinearGradient style={styles.degradado} {...colors.greyGradient} />
//           <Text extraStyles={styles.catTitle} {...typography["title-28"]}>
//             {" "}
//             {`${title}`}{" "}
//           </Text>
//         </View>
//         <View style={styles.mainContainer}>
//           {contacts.recently.map((item, index) => (
//             <ContactsCard contact={item} key={`${item.name}->${index}`} />
//           ))}
//           {contacts.all.map((item, index) => (
//             <ContactsCard contact={item} key={`${item.name}->${index}`} />
//           ))}
//         </View>
//         <View style={styles.space} />
//       </ScrollView>
//     </View>
//   );
// };

// export default CategoryPreviewScreen;
import React from "react";
import { View, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ContactsCard from "../ContactsScreen/ContactsCard";
import { colors, typography, } from "../../../../shared/styles";
import categoriasStyles from "./styles";
import users from "../../../../mocks/users";

const CategoryPreviewScreen = (props) => {
  const { image, title, subtitle } = props.route.params
  {console.log({...users})};
  return (
    <View style={...categoriasStyles.container}>
      <ScrollView scrollEventThrottle={1}>
        <View style={...categoriasStyles.spaceInitial}>
          <Image source={image} style={...categoriasStyles.catImag}/>
          <LinearGradient style={...categoriasStyles.degradado} {...colors.greyGradient} />
          <Text extraStyles={...categoriasStyles.catTitle} {...typography["title-28"]}> {`${title}`} </Text>

          <View style={...categoriasStyles.mainContainer}>
          
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
 
export default CategoryPreviewScreen;