
import React from 'react';
import { View } from 'react-native';

//components
import {  Header, FormContainer } from './../components';
import { Text, Container } from '../../../shared/components/atoms';
import { Button, FlipCard } from '../../../shared/components/molecules';

//hooks
import { useActions, useSelector, useEffect, useState } from './../../../hooks/';

//styles
import {ui, colors, typography, calculateSize } from '../../../shared/styles';

//vectors
import { Email, ErrorEmail, Check, Reloj } from '../../../shared/vectors'

//constantes de navegación
import { ADD_PHOTO, UPDATE_EMAIL, EMAIL_CONFIRMATION } from './../../../navigation/constants';

//selectors
import { getShippingTime, getRegisterData, getFirebaseUser } from '../../../state/ducks/system/systemSelectors';
import { getScreenState } from './../../../state/ducks/screens/screensSelectors';

//utils
import resetUserRegister from './../utils/RESET_USER_REGISTER';





const CardSending = React.memo(({email})=> (

    <View style= {{ flex: 1, justifyContent: 'space-between', alignItems: 'center',}}>

        <Text {...typography["title-24"]} color={colors.acento.primary} extraStyles={{marginBottom:calculateSize(20), marginTop:ui.margin}}>
            Confirmación del correo
        </Text>

        <Text {...typography["body-18"]} color={colors.grey.t60} extraStyles={{marginBottom:calculateSize(30)}}>
            Enviamos un link a tu buzón para que puedas validar tu correo electronico.
        </Text>

        <Email size={calculateSize(64)} extraStyles={{marginVertical:calculateSize(15)}}/>

        <Text {...typography["body-18"]} color={colors.acento.primary} extraStyles={{marginBottom:ui.margin}}>
            {email}
        </Text>

    </View>

))

const SuccessfulCard = React.memo(()=> (

    <View style= {{ flex: 1, justifyContent: 'space-between', alignItems: 'center',}}>

        <Text {...typography["title-24"]} color={colors.acento.primary} extraStyles={{marginBottom:calculateSize(20), marginTop:ui.margin}}>
            ¡Genial!
        </Text>

        <Check size={calculateSize(80)} extraStyles={{marginVertical:calculateSize(15)}}/>

        <Text {...typography["body-18"]} color={colors.acento.primary} extraStyles={{marginBottom:ui.margin}}>
            Tu correo ya esta validado
        </Text>

    </View>

))

const ErrorCard = React.memo(({email})=> (

    <View style= {{ flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>

        <Text {...typography["title-24"]} color={colors.acento.primary} extraStyles={{marginBottom:calculateSize(20), marginTop:ui.margin, paddingHorizontal: calculateSize(20), textAlign:'center'}}> 
            {`No recibimos tu confirmación :( `}
        </Text>

        <ErrorEmail size={calculateSize(80)} extraStyles={{marginVertical:(15)}}/>

        <Text {...typography["body-18"]} color={colors.acento.primary} extraStyles={{marginBottom:ui.margin}}>
            {`¿Te fijaste en la carpeta de spam de ${email} ?`}
        </Text>
        
    </View>

))

const SentCard = React.memo(({email})=> (

    <View style= {{ flex: 1, justifyContent: 'space-between', alignItems: 'center',}}>

        <Text {...typography["title-24"]} color={colors.acento.primary} extraStyles={{marginBottom:calculateSize(10), marginTop:ui.margin}}>
            Revisa tu correo y haz click en el link que te enviamos a
        </Text>

        <Text {...typography["body-20"]} color={colors.acento.primary} extraStyles={{marginBottom:calculateSize(20), marginTop:ui.margin}}>
            {email}
        </Text>

        <Text {...typography["body-18"]} color={colors.grey.t60} extraStyles={{marginBottom:(30)}}>
            Tip: Revisa en la carpeta de spam o correo no deseado
        </Text>

        <Reloj size={calculateSize(64)} extraStyles={{marginVertical:calculateSize(15)}}/>

        <Text {...typography["body-18"]} color={colors.acento.primary} extraStyles={{marginBottom:ui.margin}}>
            ...esperando aprobación
        </Text>

    </View>

))


export default EmailConfirmationScreen = ({navigation})=>{
    
    //Estado de redux
    const { remaningTime:timer, face, frontScene, backScene, activeScene, ready, viewed } = useSelector(state => getScreenState(state,EMAIL_CONFIRMATION))
    const email = useSelector(getRegisterData)?.email
    const emailVerified= useSelector(getFirebaseUser)?.emailVerified
    const shippingTime = useSelector(getShippingTime)
    let countdown;
    
    //Acciones de Redux
    const { cancelRegister, checkEmail, resetVerifyEmail } = useActions( 'cancelRegister', 'checkEmail', 'resetVerifyEmail' )


    //Estado local
    const [remaningTime , setRemaningTime] = useState(60)


    useEffect(()=>{

        countdown = setInterval(()=>{

            if(remaningTime <1){
                clearInterval(countdown)
            }else{
                setRemaningTime( previus  => (previus - 1) )
            }

        },1000)

        return ()=>{
            clearInterval(countdown)
        }

    },[shippingTime])


    useEffect(()=>{
        setRemaningTime(timer)
    },[timer])




    useEffect(()=>{
        if(emailVerified){
            navigation.replace(ADD_PHOTO)
        }
    },[emailVerified])





    const getCardForScene = (scene) =>{

        switch (scene) {
            case 'sending': { return ()=> <CardSending email={email} /> }
            case 'successful':{ return ()=> <SuccessfulCard/> }
            case 'error':{ return ()=> <ErrorCard email={email} /> }
            case 'sent':{ return ()=> <SentCard email={email} /> }          
            default: { break }                
        }

    }

    
    const StateButton = ()=>{

        if(activeScene === 'sending'){
            return (
                <Button 
                    theme='light' 
                    loading={true} 
                    extraStyles={{marginTop: ui.margin}} 
                    title='enviando correo' 
                />
            )                
        }
        if(activeScene === 'sent' && viewed){
            return (
                <Button 
                    theme='light' 
                    extraStyles={{marginTop: ui.margin}} 
                    title='¿Ya lo validaste?' 
                    onPress={()=>checkEmail()} 
                />
            ) 
        }
        if(activeScene === 'sent' && (!viewed)){
            return (
                <Button 
                    theme='light' 
                    Icon={Check} 
                    disabled={true}  
                    extraStyles={{marginTop: ui.margin}} 
                    title='Correo enviado' 
                /> 
            )
        }
        if(activeScene === 'error'){
            return (
                <Button 
                    theme='light' 
                    disabled ={!ready} 
                    extraStyles={{marginTop: ui.margin}} 
                    title={ready?`Reenviar link`:`Reenviar link (${remaningTime})`} 
                    onPress={()=>resetVerifyEmail()} 
                />
            ) 
        }
        if(activeScene === 'successful'){
            return null               
        }
    }


    const updateEmail = ()=>{
        navigation.navigate(UPDATE_EMAIL)
    }

    

    const getTitleMenu = ()=>{
        if(activeScene === 'sent' || activeScene === 'error'){
            return ready ? 'Corregir email' : `Corregir email (${remaningTime}) `
        }
    }

    const cancel = ()=>{

        navigation.goBack();
        cancelRegister()

    }


    return (

        <Container safeArea gradient={colors.universeBackground} style={{justifyContent:'flex-start'}} >                

            <Header 
                onGoBack={resetUserRegister(cancel)} 
                menuName= {getTitleMenu()}
                onPressMenu={updateEmail}
                disabledMenu={!ready}
            />
            <FormContainer>
                <FlipCard
                    BackComponent={getCardForScene(backScene)}
                    FrontComponent={getCardForScene(frontScene)}
                    face={face}
                />
                <StateButton/>
            </FormContainer>

        </Container>
    )

     
    
}




