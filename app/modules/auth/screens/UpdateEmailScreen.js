
//react components
import React from 'react';
import { useRef, useEffect, useSelector } from '../../../hooks';
import { KeyboardAvoidingView } from 'react-native';


//shared components
import { Container } from '../../../shared/components/atoms';
import { TextInput } from './../../../shared/components/molecules';

//module components
import { Header, FormContainer, FormButtons, FormCard } from './../components';

//styles
import { colors } from '../../../shared/styles';

//form settings
import { field, defaultValues, handleValidate } from '../forms/UpdateEmailForm';
import { Formik } from 'formik';

//selectors
import { getRegisterData } from '../../../state/ducks/system/systemSelectors';
import { getScreenState } from './../../../state/ducks/screens/screensSelectors';

//services
import useActions from './../../../hooks/useActions';

//constants
import { UPDATE_EMAIL } from './../../../navigation/constants';





export default ({ navigation })=>{

  //Estado de redux
  const { email:previusEmail } = useSelector(getRegisterData)
  const { loading } = useSelector(state => getScreenState(state,UPDATE_EMAIL))

  //Acciones de redux
  const { updateEmail } = useActions('updateEmail')

  //Referencias
  const mounted = useRef();

  useEffect(()=>{

    if(!mounted.current) { 
      mounted.current = true
      console.log('se monto updateEmail'); 
    }
    else {
      console.log('se actualizo el email');  
      navigation.goBack() 
    }
    
  },[previusEmail])

  
  
  const handleSubmit = ({email})=>{
    updateEmail(email)
  }


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
    }

  }

  
  return (
    
    <Container safeArea gradient={colors.universeBackground} style={styles.container} >        
      
      <KeyboardAvoidingView  behavior='padding' style={styles.keyboardAvoidingView}>     
            
        <Header/>

        <Formik
          initialValues={(previusEmail)? {email:previusEmail} : defaultValues}
          onSubmit={handleSubmit}
          validate={handleValidate}
        >
          {(fkProps) => {
                                      
            return (

              <FormContainer>             
                              
                <FormCard title='Corrige tu correo' elements={1}>                   
                      <TextInput key={field.props.name} {...field.props} formik={fkProps}/> 
                </FormCard>

                <FormButtons height={120} showButton={true}> 

                  <Button 
                    loading={loading}
                    txtLoading='actualizando correo' 
                    onPress={ ()=>{fkProps.isValid && fkProps.handleSubmit()}} 
                    disabled={!fkProps.isValid} 
                    title='Guardar' 
                    theme='light' >
                  </Button>

                  <Button
                    onPress={()=>navigation.goBack()}  
                    title='Cancelar' 
                    theme='error' >
                  </Button>
                
                </FormButtons>

              </FormContainer>
              
            )

          }}
        </Formik> 
        
      </KeyboardAvoidingView> 

    </Container>
  );

}

