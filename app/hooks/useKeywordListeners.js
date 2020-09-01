import React, { useEffect } from 'react'
import { Keyboard } from 'react-native';


export default useKeywordListeners = (keyboardDidShow,keyboardDidHide)=>{

    useEffect(()=>{

        
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);
        
        return ()=>{
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        }
    
    },[])

}

