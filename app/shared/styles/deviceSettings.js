import { Dimensions } from 'react-native'

let dimensions = Dimensions.get('window');

const sizes = {
    small:{
        height:600,
        width:320,
        alignItems:'flex-start',
        marginTop:100,
    },
    medium:{
        height:667,
        width:375,
        alignItems:'flex-start',
        marginTop:20,
    },
    big:{
        flex:1,
        width:'100%',
        alignItems:'center',
    },

}


export default device = {
    info: dimensions,
    selected: sizes.big,
    resolution: (e= dimensions)=>{
    
        if(e.width <= 340){
            return 's'
        }
        if( (e.width > 340) && (device.width <= 380) ){
            return 'm'
        }
        if( e.width > 380){
            return 'l'
        }
    }
}


 

