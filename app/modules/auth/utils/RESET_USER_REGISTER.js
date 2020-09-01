import { Alert } from 'react-native';

export default resetUserRegister = (confirm)=>{

    return ()=>{
        
            Alert.alert(
                '¿Estas seguro que queres volver al inicio?',
                'Se perdera todo el progreso',
                [
                    {
                        text: 'No',
                        style: 'cancel'
                    },
                    {
                        text: 'Si, porfavor', 
                        onPress: confirm
                    },              
                ],
                {cancelable: false},
            );        
        
    }

}
