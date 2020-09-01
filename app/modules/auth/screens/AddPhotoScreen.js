import React from 'react';
import { useState, useEffect, useToogle, useActions, useSelector } from '../../../hooks';
import Constants from 'expo-constants';

//components
import { Group, Container } from '../../../shared/components/atoms';
import { Header, Tips, ProfileCard, FormContainer, MenuPhotos } from './../components';

//styles
import { colors, calculateSize } from '../../../shared/styles';

//IMAGE PICKER
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

//utils
import resetUserRegister from './../utils/RESET_USER_REGISTER';

//constants
import { ADD_PHOTO } from '../../../navigation/constants';

//selectors
import { getScreenState } from '../../../state/ducks/screens/screensSelectors';





const  AddPhotoScreen = ({navigation})=>{

  //Acciones de Redux
  const { cancelRegister, uploadPhoto } = useActions( 'cancelRegister', 'uploadPhoto' )

  //Estado de redux
  const { loading } = useSelector(state => getScreenState(state,ADD_PHOTO))

  //Estado local
  const [ menu, toogleMenu ] = useToogle(false)
  const [ photoURL, setPhotoURL ] = useState(null) 


  const options = {
    mediaTypes: ImagePicker.MediaTypeOptions.Image,
    allowsEditing: true,
    aspect: [1,1],
  }

  const tips = [
    'Procura que se vea bien tu cara',
    'Sacate una foto con luz natural',
    'Busca una foto con buena calidad',
    'Transmiti confianza y seguridad'
  ]

  


  useEffect(()=>{
    getPermissionsAwait()
  },[])


  const getPermissionsAwait = async()=>{

    if (Constants.platform.ios) {

      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status !== 'granted') {
        alert('Lo lamentamos, pero necesitamos los permisos de la galeria para seguir funcionando');
      }

    }

    const { status: status2 } = await Permissions.askAsync(Permissions.CAMERA);

    if (status2 !== 'granted') {
      alert('Lo lamentamos, pero necesitamos los permisos de la cámara para seguir funcionando');
    }

  }


  const handleSubmit = ()=>{

    uploadPhoto(photoURL)

  }


  const setImage = (result)=>{

    toogleMenu()

    if (!result.cancelled) {
      setPhotoURL(result.uri)
    }

  }


  const pickImage = async()=>{

    let result = await ImagePicker.launchImageLibraryAsync(options)
    setImage(result);

  }

  const takePhoto = async()=>{

    let result = await ImagePicker.launchCameraAsync(options)
    setImage(result);   

  }

  const cancel = ()=>{

    navigation.popToTop();
    cancelRegister()

  }

  
  return (  

      <Container safeArea gradient={colors.universeBackground} style={{justifyContent:'flex-start'}} >
      
          <Header menuName= 'Volver al inicio' onPressMenu={resetUserRegister(cancel)}/> 

          <FormContainer>

              <ProfileCard
                  onPressPhoto={toogleMenu}
                  photo={photoURL?{uri:photoURL}:null}
                  headerTitle={'Subi tu foto de perfil'}
              >
                  <Tips list={tips}/>
                  
              </ProfileCard>

              <Group>
                  <Button 
                    onPress={toogleMenu}
                    type='outline' 
                    title={(photoURL)?"Cambiar foto":"Cargar foto"} 
                    theme='light'>
                  </Button>
                  <Button 
                    onPress={handleSubmit}
                    loading={loading} 
                    txtLoading='Subiendo foto...' 
                    disabled={!photoURL} 
                    last 
                    title="Continuar" 
                    theme='light'>
                  </Button>
              </Group>


          </FormContainer> 
          
          <MenuPhotos
            menu={menu} 
            toogleMenu={toogleMenu}
            contentSize={calculateSize(300)} 
            title='Elige una opción' 
            options={[
              {Icon:Galery,name: 'Seleccionar de la Galeria',action:pickImage},
              {Icon:Camera, name:'Sacar una foto',action:takePhoto}
            ]} 
          /> 
      
      </Container>
  );

  
}

export default AddPhotoScreen