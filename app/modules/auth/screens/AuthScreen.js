//dependecies
import React from 'react';
import { Alert, StatusBar } from 'react-native';
import { NetInfo } from '@react-native-community/netinfo';
import { useState, useToogle, useEffect, useRef, useCallback, useFocusEffect, useSelector, useActions, useContext  } from '../../../hooks';


//components
import { Text, Group, Container, Estrellas, FadeAnimation } from '../../../shared/components/atoms';
import { Button } from '../../../shared/components/molecules';
import { Terms } from '../components';

//styles
import { typography, colors, ui, calculateSize } from '../../../shared/styles';

//vectors
import { Logotipo, Key, Facebook, Google } from '../../../shared/vectors'

//constants
import { SIGN_IN, ADD_PHOTO, EMAIL_CONFIRMATION } from '../../../navigation/constants';

//selectors
import { getAuthorization } from './../../../state/ducks/user/userSelectors';
import { getProvider, getFirebaseUser, getNetInfo } from '../../../state/ducks/system/systemSelectors';
import { getScreenState } from './../../../state/ducks/screens/screensSelectors';
import { AUTH } from './../../../navigation/constants';

//Context
import { AnimationSync } from './../../../animations';


const AuthScreen = (props)=> {
 

  //Declaración de constantes y variables
  const mounted = useRef()
  
  //Destructuración de los props
  const { navigation } = props;
  
  //Estado interno
  const [ terms, toogleTerms ] = useToogle(true) 
  const [ animation, toogleAnimation] = useState(true)

  
  //Estado de redux
  const firebaseUser = useSelector(getFirebaseUser)
  const authorization = useSelector(getAuthorization)
  const provider = useSelector(getProvider)
  const { loadings: { google:loadingGoogle, facebook:loadingFacebook} } = useSelector(state => getScreenState(state,AUTH))
  const { isConnected } = useSelector(getNetInfo)
  
  //Acciones de Redux
  const { login, logout } = useActions( 'login', 'logout' )

  //Contexto de animación
  const swipeMenu = useContext(AnimationSync);  

  swipeMenu.reset()

  
  useFocusEffect(

    /*
    En los casos en los que retroceda de crear una cuenta y su proceso; 
    Inmediatamente al hacer foco, hacemos LOGOUT() que implica una limpieza del estado global.
    */

    useCallback(()=>{

      if(mounted.current){
        logout()      
      }

    },[])

  )

  useEffect(()=>{

    if(!mounted.current){
      mounted.current = true
    }

    if(firebaseUser){ 

      if((!authorization) && (provider === 'password')){ 

        if(firebaseUser.emailVerified){

          navigation.navigate(ADD_PHOTO);   

        }else{

          navigation.navigate(EMAIL_CONFIRMATION);

        }
        
      }

    }

  },[])
 
  useEffect(() => {

    const unsubscribeFocus = navigation.addListener('focus', ()=>toogleAnimation(true));
    const unsubscribeBlur = navigation.addListener('blur', ()=>toogleAnimation(false));

    return ()=>{
      unsubscribeFocus();
      unsubscribeBlur()
    }

  }, [navigation]);



  const continueWithEmail = ()=>{

    if(isConnected){
      navigation.navigate(SIGN_IN);
    }else{
      Alert.alert('No hay conexion a internet :(')
    }
  }

  const continueWithFacebook = ()=>{


    if(isConnected){

      const facebook = {
        option:'facebook',
      }
  
      login(facebook)

    }else{
      Alert.alert('No hay conexion a internet :(')
    }

    

  }

  const continueWithGoogle =()=>{

    if(isConnected){

      const google = {
        option:'google'
      }
  
      login(google)

    }else{
      Alert.alert('No hay conexion a internet :(')
    }


  }

  const styles = {

    fadeAnimation:{
      flex:1, 
      width:'100%', 
      justifyContent:'flex-end',
      paddingVertical: calculateSize(50),
    },
    portada:{
      alignItems:'center',
      justifyContent:'center',
      marginBottom:calculateSize(20)
    },
    buttons:{
      paddingHorizontal:ui.padding
    },
    title_part1:{
      marginTop:calculateSize(30)
    },
    title_part2:{
      marginBottom:ui.margin*2
    },
    terms:{
      marginBottom:calculateSize(30)
    }

  }

  const fadeAnimationProps = {

    extraStyles:styles.fadeAnimation,
    transformValues: [
      {
        name:'translateY',
        outputRange:[200,0]
      }
    ]
    
  }

  return (
  
    <Container gradient={colors.universeBackground} safeArea>
      <StatusBar barStyle='light-content'/>
      {(animation) && <Estrellas/>}
      <FadeAnimation {...fadeAnimationProps}>
        <Group style={styles.portada}>
          <Logotipo size={'70%'}/>
          <Text {...typography["body-20"]} color={colors.white()} extraStyles={styles.title_part1} >  Hola! te damos la bienvenida a esta </Text>
          <Text {...typography["body-20"]} color={colors.white()} extraStyles={styles.title_part2} > {`increble app  :)`}  </Text>
        </Group>
        <Group style={styles.buttons}>             
          <Button 
            onPress={continueWithEmail}    
            txtFont={typography["title-20"]}  
            title="Continuar con tu correo" 
            Icon={Key} 
            theme='light'
            disabled={(!terms)||loadingGoogle||loadingFacebook}
            alignIcons
          />
          <Button 
            onPress={continueWithGoogle}   
            loading={loadingGoogle} 
            txtLoading='Aguarda unos segundos...'
            title="Continuar con Google" 
            Icon={Google} 
            theme='google'                
            disabled={(!terms)||loadingFacebook}
            alignIcons
          />
          <Button 
            onPress={continueWithFacebook} 
            loading={loadingFacebook} 
            txtLoading='Aguarda unos segundos...'
            title="Continuar con Facebook"
            Icon={Facebook} 
            theme='facebook'                
            disabled={(!terms)||loadingGoogle}
            last
            alignIcons
          />
        </Group>        
      </FadeAnimation>
      <FadeAnimation extraStyles={styles.terms}>  
        <Terms value={terms} onChange={toogleTerms}/>    
      </FadeAnimation> 
      
    </Container>
);
  
          

     

  
}



export default AuthScreen

