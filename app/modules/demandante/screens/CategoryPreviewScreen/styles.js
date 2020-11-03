import { StyleSheet } from 'react-native';
import { colors, ui } from "../../../../shared/styles";

export default categoriasStyles = StyleSheet.create({  
    container: {
       width: "100%",
       justifyContent: "flex-start",
       alignItems: "center",
       backgroundColor: colors.backgroundGrey.primary,
     },
     catImag: {
       width: "100%",
       height: 250,
       borderRadius: 10,
     },
    //  catTitle: {
    //    textAlignVertical: "top",
    //    position: "absolute",
    //    color: colors.white(0.95),
    //    paddingLeft: ui.padding + ui.borderRadius.borderRadius / 2,
    //  },
     degradado: {
       position: "absolute",
       width: "100%",
       height: "100%",
     },
     spaceInitial: {
       marginTop: ui.margin,
       marginLeft: ui.padding,
     },
     mainContainer: {
       marginTop: ui.padding,
     },
     
})
