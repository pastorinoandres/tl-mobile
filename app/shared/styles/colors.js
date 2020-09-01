export default colors = {
    acento:{
        primary: '#007A90',
        secondary: '#006E82',
        tertiary: '#005565'
    },
    trabajadores:{
        primary: '#0B8784',
        secondary: '#086967',
        tertiary: '#085E5C'
    },
    demandantes:{
        primary: '#1274BA',
        secondary: '#0E5A91',
        tertiary: '#0D5182'
    },
    backgroundGrey:{
        primary: '#F2F2F2',
        secondary: '#DADADA',
        tertiary: '#A9A9A9'
    },
    correcto:{
        primary: '#94D079',
        secondary: '#689255',
    },
    alerta:{
        primary: '#E8A82D',
        secondary: '#A2761F',
    },
    error:{
        primary: '#B83643',
        secondary: '#81262F',
    },
    neutral:{
        primary: '#999999',
        secondary: '#6B6B6B',
    },
    grey:{
        t10: 'rgba(0,0,0,0.1)',
        t20: 'rgba(0,0,0,0.2)',
        t30: 'rgba(0,0,0,0.3)',
        t40: 'rgba(0,0,0,0.4)',
        t60: 'rgba(0,0,0,0.6)',
        t80: 'rgba(0,0,0,0.8)'        
    },
    white: (alfa = 1)=>`rgba(255,255,255,${alfa})`,
    black: (alfa = 1)=>`rgba(0,0,0,${alfa})`,
    social:{
        facebook: '#4267B2',        
    },
    universeBackground:{
        colors:['#0E5A91','#0C9693'],
        start:[0, 0],
        end:[1, 1],
        locations:[.2,.8]
    },
    pedidoBackground:{
        colors:['#009989','rgba(0, 125, 153, 0.83)'],
        start:[0.25, 0.5],
        end:[0.75, 0.5],
        locations:[0, 1]
    },
    notification:{
        colors:['#FCABAB','rgba(246, 8, 8, 1)'],
        start:[0, 0],
        end:[1, 1],
        locations:[0.6, 1]
    },
    timeline:{
        colors:['#1274BA','#FFFFFF'],
        start:[0.1, 0.9],
        end:[0.8, 0.2],
        locations:[0, 1]
    },
    demandanteGradient:{
        colors:['#1274BA','#0E5A8F'],
        start:[0.1,0.8],
        end:[0.9,0.1],
        locations:[0.5,1]
    },
    none:{
        colors:['rgba(255, 255, 255, 1)','rgba(255, 255, 255, 1)'],
        start:[0.75, 0.2],
        end:[0.2, 0.8],
        locations:[0, 1]
    },
    greyGradient:{
        colors:['rgba(242, 242, 242, 0.4)','rgba(242, 242, 242, 1)'],
        start:[0.5, 0],
        end:[0.5, 1],
        locations:[0.25,0.75]
    }

}

// Linear Gradient : <LinearGradient ... colors.universeBackground ></LinearGradient>
// Documentación: https://docs.expo.io/versions/latest/sdk/linear-gradient/
