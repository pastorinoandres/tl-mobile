
//react components
import React from 'react';
import { useEffect, useSelector, useActions } from '../../../hooks';
import { KeyboardAvoidingView, Alert } from 'react-native';


//shared components
import { Container, Text } from '../../../shared/components/atoms';
import { TextInput } from './../../../shared/components/molecules';

//module components
import { Header, FormContainer, FormButtons as FormTitle, FormCard } from './../components';

//styles
import { colors, typography } from '../../../shared/styles';

//form settings
import { fields, defaultValues, handleValidate } from '../forms/SignInForm';
import { Formik } from 'formik';

//navigation constants
import { ADD_PHOTO, REGISTER, EMAIL_CONFIRMATION, SIGN_IN } from './../../../navigation/constants';

//selectors
import { getFirebaseUser } from '../../../state/ducks/system/systemSelectors';
import { getUser } from '../../../state/ducks/user/userSelectors';
import { getScreenState } from './../../../state/ducks/screens/screensSelectors';




const SignInScreen = ({ navigation })=>{

  //Estado de redux
  const { loadings: { signIn:loading, restorePassword:loadingSendEmail}, sent } = useSelector(state => getScreenState(state,SIGN_IN))
  const firebaseUser = useSelector(getFirebaseUser)
  const userData = useSelector(getUser)

  //Acciones de Redux
  const { login, restorePassword } = useActions( 'login', 'restorePassword' )

  useEffect(()=>{
    
    if(userData){

      if(firebaseUser.emailVerified){
        navigation.navigate(ADD_PHOTO)
      }else{
        navigation.navigate(EMAIL_CONFIRMATION);
      }

    }

  },[userData])

  
  const handleSubmit = ({email, password})=>{


    const settings = {
      option:'email',
      params:{
        method:'signIn',
        email, 
        password
      }
    }

    login(settings)

  }

  const forgotPassword = (email)=>{

    if(email){

      Alert.alert(
          `Se enviara un correo para restablecer la contraseña`,
          `¿Te parece bien que lo enviemos  a ${email}?`,
          [
              {
                  text: 'Tengo que corregir el correo',
                  style: 'cancel'
              },
              {
                  text: 'Enviame el correo', 
                  onPress: () => restorePassword(email)
              },              
          ],
          {cancelable: false},
      );

    }
    else{
      Alert.alert(`Necesitamos tu email `,`Escribe tu correo y vuelve a intentarlo`)
    }

  }

  const signUpWithEmail = ()=>{
    navigation.replace(REGISTER);
  }


  const goBack = ()=>{
    navigation.goBack()
  }

  /* height -> 201 --> 50+10+1+10+50+20+60 */

  const styles = {
    
    container:{
      justifyContent:'flex-start'
    },
    keyboardAvoidingView:{
      flex:1, 
      width:'100%'
    },
    fadeAnimation:{
      width:'100%', 
      flexDirection:'row', 
      justifyContent:'flex-end'
    },
    button:{
      paddingHorizontal:0
    },    
    text:{
      width: '100%', 
      textAlign:'left', 
      paddingLeft: ui.borderRadius.borderRadius
    },

  }

  
  return (
    
    <Container safeArea gradient={colors.universeBackground} style={styles.container} >        
      
      <KeyboardAvoidingView  behavior='padding' style={styles.keyboardAvoidingView}>     
            
        <Header
          onGoBack={goBack}
          menuName= '... o crea una cuenta' 
          onPressMenu={signUpWithEmail}
          title='Inicia Sesión'
        />


        <Formik
          initialValues={defaultValues}
          onSubmit={handleSubmit}
          validate={handleValidate}
        >
          {(fkProps) => {
                                      
            return (

              <FormContainer>
              
                <FormTitle>
                  <Text {...typography["title-24"]} color={colors.white(1)} extraStyles={styles.text}>
                    Inicia Sesión
                  </Text>
                </FormTitle>
                              
                <FormCard title='Inicia Sesión' elements={fields.length}>
                    
                    {fields.map((field)=>(<TextInput key={field.props.name} {...field.props} formik={fkProps}/>))}
                    
                    <Button 
                      extraStyles={styles.button} 
                      txtFont={typography['body-16']} 
                      onPress={()=>{(!sent) && forgotPassword(fkProps.values['email'])}} 
                      fit 
                      last 
                      title={(sent)?'Ya te enviamos el correo a tu bandeja ✔': '¿Olvidaste la contraseña?' }
                      type='transparent'
                      loading={loadingSendEmail} 
                      txtLoading='Estamos enviando tu correo...'
                    />

                </FormCard>

                

                <Button 
                  loading={loading} 
                  onPress={ ()=>{fkProps.isValid && fkProps.handleSubmit()}} 
                  disabled={!fkProps.isValid}  
                  title='Continuar' 
                  theme='light' >
                </Button>

              </FormContainer>
              
            )

          }}
        </Formik> 
        
      </KeyboardAvoidingView> 

    </Container>
  );

}


export default SignInScreen
