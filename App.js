
//dependecies
import React from 'react';
import { useRef, useToogle, useEffect } from './app/hooks';
import { AsyncStorage } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { AppLoading } from 'expo';
import NetInfo from '@react-native-community/netinfo';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Providers
import { Provider as ReduxProvider } from 'react-redux';
import { AppearanceProvider } from 'react-native-appearance';
import ReactNavigationContainer from './app/navigation';


//Services
import { auth } from './app/services/firebase';

//State
import store from './app/state/store'

//Actions
import { clockin, clearData, setNetInfo } from './app/state/ducks/system/systemActions';
import initializeState from './app/state/initializeState';
import { getSession } from './app/state/ducks/system/systemSelectors';
import fix from './fix';
import AnimationsApp from './app/animations';




console.disableYellowBox = ['Remote debugger'];
console.ignoredYellowBox = ['Setting a timer'];





const App = ()=>{

  // enableScreens();
  fix()
  const [ isReady, toogleIsReady ] = useToogle(false)
  const firstUse = useRef(false)
  const reduxStore = useRef();

  useEffect(()=>{
    firstUse.current = isReady
  },[isReady])

  useEffect(()=>{

    if(isReady){

      NetInfo.addEventListener( state => {

        reduxStore.current.dispatch(setNetInfo(state))
  
      });

    }

  },[isReady])
  
  const getAsyncStorage =()=>{
    
    return new Promise((resolve,reject)=>{
      
      AsyncStorage.getItem('reduxStore').then((result)=>{

        const storageData = (result)?JSON.parse(result):{}
        const initialState = initializeState(storageData)   
        reduxStore.current = store(initialState)

        auth.onAuthStateChanged((data)=>{

          //Aca podemos registrar cada vez que ingresa a la app
          
          const user = (data)? data.toJSON() : null
          console.log({onAuthStateChange:user});

          //Esta es la instancia donde se esta cargando la aplicación. Solo ocurre una sola vez cuando se abre la app
          if(!firstUse.current){

            //Si no existe usuario al ingresar a la app (pero si hay datos en memoria), entonces hay que borrar todos los datos en memoria.
            //Esto se hace para que el usuario no pueda usar la app sin una session valida.
            const session = getSession(reduxStore.current.getState())

            if(!user && session){
              auth.signOut()
              reduxStore.current.dispatch(clearData())              
            }

            reduxStore.current.dispatch(clockin())
            firstUse.current = true;
            
            //Se habilita el uso de la app
            resolve()

          }

        })
        
      }).catch(reject)

    }) 
  }

  


  if(isReady){
    
    return ( 
      <ReduxProvider store={reduxStore.current}>
        <SafeAreaProvider>
          <AppearanceProvider>
            <AnimationsApp>
              <ReactNavigationContainer/>                
            </AnimationsApp>          
          </AppearanceProvider>        
        </SafeAreaProvider>
      </ReduxProvider>
    );

  }else{

    return(
      <AppLoading
        startAsync={getAsyncStorage}
        onFinish={()=>toogleIsReady()}
        onError={console.warn}
      />
    )
  }
  
}


export default App;