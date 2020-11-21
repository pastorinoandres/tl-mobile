import { colors } from "../../../../../shared/styles";

export const getRepTextAndColor = (numRep)=> {
  let textAndColor;
    switch (true) {
      case (numRep<3): 
      textAndColor = {
          color:colors.error.primary, 
          descripcion:"Baja reputación",
       
        }
        break;
        
      case (numRep>=3 && numRep < 4): 
      textAndColor = {
        color:colors.alerta.primary, 
        descripcion:"Buena reputación",        
      } 
      break;                
      case (numRep>=4): 
      textAndColor = {
        color:colors.correcto.primary, 
        descripcion:"Excelente reputación",
      }                 
      break;
      default:
        textAndColor = {
        color:colors.correcto.primary, 
        descripcion:"Reputacion Normal",
      }                 
        break;
    }
    return textAndColor;
  }

  