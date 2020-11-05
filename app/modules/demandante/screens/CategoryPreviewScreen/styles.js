import { StyleSheet } from 'react-native';
import { colors, ui } from "../../../../shared/styles";

export default categoriasStyles = StyleSheet.create({  
    container: {
      flex:1,
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
      catTitle: {
        paddingTop: ui.padding,
        textAlignVertical: "top",
        position: "absolute",
         color: colors.black(0.7),
        paddingLeft: ui.padding + ui.borderRadius.borderRadius / 2,
      },
     degradado: {
       position: "absolute",
       width: "100%",
       height: "100%",
     },
     spaceInitial: {
       backgroundColor: "red",
       marginTop: ui.margin,
       marginLeft: ui.padding,
     },
     mainContainer: {
       marginTop: ui.padding,
       marginBottom: 50 + ui.margin,
     },
     catText:{
      textAlign: "left", 
      marginLeft: ui.margin,
       marginBottom: ui.margin,
     },
     scrollView: {
      width:"100%"
     },
     
})
