

import { Dimensions } from 'react-native'

// import { Font } from 'expo';

// componentDidMount() {
//     Font.loadAsync({
//         'SF-Compact-Display':require('../assets/fonts/sf-compact-display-medium-5864711817c30.otf')
//     })
// }


const {width:windowWidth, height:windowHeight} = Dimensions.get('window');

const peso = {

    semibold:{
        fontWeight:'600'
    },
    regular:{
        fontWeight:'400'
    },
    light:{
        fontWeight:'300'
    }
}

const font = {

    SanFrancisco: {
        fontFamily: 'System',
    }
}


function calculateFontSize(fontSize){

    const screenSizeDefault = 414
    const porcentaje = fontSize/screenSizeDefault

    return windowWidth*porcentaje

}

export default typography = {

    ['title-32']:{
        typography:{        
            fontSize:calculateFontSize(32),
            ...peso.semibold,
            ...font.SanFrancisco
        }
    },
    ['title-28']:{
        typography:{
            fontSize:calculateFontSize(28),
            ...peso.semibold,
            ...font.SanFrancisco
        }
    },
    ['title-24']:{
        typography:{
            fontSize:calculateFontSize(24),
            ...peso.semibold,
            ...font.SanFrancisco
        }
    },
    ['title-20']:{
        typography:{
            fontSize:calculateFontSize(20),
            ...peso.semibold,
            ...font.SanFrancisco
        }
    },

    ['body-24']:{        
        typography:{
            fontSize:calculateFontSize(24),
            ...peso.regular,
            ...font.SanFrancisco
        }
    },
    ['body-20']:{        
        typography:{
            fontSize:calculateFontSize(20),
            ...peso.regular,
            ...font.SanFrancisco
        }
    },
    ['body-18']:{        
        typography:{
            fontSize:calculateFontSize(18),
            ...peso.regular,
            ...font.SanFrancisco
        }
    },
    ['body-16']:{
        typography:{
            fontSize:calculateFontSize(16),
            ...peso.regular,
            ...font.SanFrancisco
        }        
    },
    ['body-14']:{        
        typography:{
            fontSize:calculateFontSize(14),
            ...peso.regular,
            ...font.SanFrancisco
        }
    },


    ['body-strong-18']:{        
        typography:{
            fontSize:(18),
            ...peso.semibold,
            ...font.SanFrancisco
        }
    },
    ['body-strong-16']:{        
        typography:{
            fontSize:calculateFontSize(16),
            ...peso.semibold,
            ...font.SanFrancisco
        }
    },
    ['body-strong-14']:{        
        typography:{
            fontSize:calculateFontSize(14),
            ...peso.semibold,
            ...font.SanFrancisco
        }
    },


    ['caption-12']:{        
        typography:{
            fontSize:calculateFontSize(12),
            ...peso.regular,
            ...font.SanFrancisco
        }
    },


    ['display-44']:{        
        typography:{
            fontSize:calculateFontSize(44),
            ...peso.light,
            ...font.SanFrancisco
        }
    },


}


