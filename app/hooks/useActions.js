import { useDispatch } from 'react-redux';
import {
    setProfile,
    setUser,
    addProvider,
    addPermission,
} from './../state/ducks/user/userActions';

import { 
    setShippingTime,
    setSession,
    setRegisterData,
    setSystem,
    clearData,
    login,
    logout,
    setFirebaseUser,
    restorePassword,
    updateEmail,
    cancelRegister,
    checkEmail,
    resetVerifyEmail,
    uploadPhoto
 } from './../state/ducks/system/systemActions';




const actionsList = {
    setProfile,
    setUser,
    addProvider,
    addPermission,
    setShippingTime,
    setSession,
    setRegisterData,
    setSystem,
    clearData,
    login,
    logout,
    setFirebaseUser,
    restorePassword,
    updateEmail,
    cancelRegister,
    checkEmail,
    resetVerifyEmail,
    uploadPhoto
}

export default useActions = (...actions)=>{
    
    let actionsObj = {};
    const dispatch = useDispatch()

    for (const id of actions) {
        actionsObj[id] = (data) => { dispatch(actionsList[id](data)) } 
    }

    return actionsObj;

}