
import { Dimensions } from 'react-native';

const {width:windowWidth, height:windowHeight} = Dimensions.get('window');


export default function calculateSize(originalSize){

    const screenSizeDefault = 414
    const porcentaje = originalSize/screenSizeDefault

    return windowWidth*porcentaje

}