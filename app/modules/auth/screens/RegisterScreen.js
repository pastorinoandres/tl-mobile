

//react components
import React from 'react';
import { KeyboardAvoidingView, Alert } from 'react-native';
import { useActions, useSelector, useEffect  } from './../../../hooks';

//shared components
import { Container, Text } from '../../../shared/components/atoms';
import { TextInput } from './../../../shared/components/molecules';

//module components
import { Header, FormContainer, FormButtons as FormTitle, FormCard } from './../components';

//styles
import {colors, typography} from '../../../shared/styles';

//form settings
import { fields, defaultValues, handleValidate } from '../forms/RegisterForm';
import { Formik } from 'formik';

//constants
import { EMAIL_CONFIRMATION, REGISTER, SIGN_IN } from './../../../navigation/constants';

//selectors
import { getUser } from '../../../state/ducks/user/userSelectors'
import { getScreenState } from './../../../state/ducks/screens/screensSelectors';



const RegisterScreen = ({ navigation }) => {

  //Estado de redux
  const { loadings: {signUp:loading} } = useSelector(state => getScreenState(state,REGISTER))
  const userData = useSelector(getUser)

  //Acciones de Redux
  const { login } = useActions( 'login' )

  useEffect(()=>{
    
    if(userData){
      navigation.replace(EMAIL_CONFIRMATION)
    }

  },[userData])

  
  const handleSubmit = ({email, password, name, surname})=>{

    const settings = {
      option:'email',
      params:{
        method:'signUp',
        email, 
        password, 
        name, 
        surname
      }
    }

    login(settings)

  }
   
  
  const goBack = ()=>{
    navigation.goBack()
  }

  const signIn =  ()=>{
    navigation.replace(SIGN_IN)
  }
  

  const styles = {

    container:{
      justifyContent:'flex-start'
    },
    keyboardAvoidingView:{
      flex:1, 
      width:'100%'
    },
    text:{
      width: '100%', 
      textAlign:'left', 
      paddingLeft: ui.borderRadius.borderRadius
    },

  }

  return (
    
      <Container safeArea gradient={colors.universeBackground} style={styles.container} >

        <KeyboardAvoidingView behavior='padding' style={styles.keyboardAvoidingView}>

          <Header 
            onGoBack={goBack} 
            menuName= '... ó inicia sesión' 
            onPressMenu={signIn} 
            title='Crear cuenta'
          />

          <Formik
            initialValues={ defaultValues }
            onSubmit={ handleSubmit }
            validate={ handleValidate }
            
          >
            {(fkProps) => {
                                        
              return (

                <FormContainer>

                  <FormTitle>
                    <Text {...typography["title-24"]} color={colors.white(1)} extraStyles={styles.text}>
                      Crear cuenta
                    </Text>
                  </FormTitle>
                    
                  <FormCard elements={fields.length}>

                  {fields.map((field)=>(<TextInput key={field.props.name} {...field.props} formik={fkProps} serverValidation={field.serverValidation}/>))}

                  </FormCard>

                  <Button 
                    loading={loading} 
                    onPress={ ()=>{fkProps.isValid && fkProps.handleSubmit()}} 
                    disabled={!fkProps.isValid}
                    title='Crear cuenta'
                    txtLoading='Creando cuenta' 
                    theme='light' 
                  />

                </FormContainer>
                
              )

            }}
          </Formik>

          

        </KeyboardAvoidingView>

      </Container>
  );

  
}

export default RegisterScreen
