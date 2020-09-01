
//dependecies
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers'; 
import rootSaga from './rootSaga'
import { AsyncStorage } from 'react-native';

export default store = (preloaderState)=>{
    
    //Creacion de constantes para la creacion del store
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const sagaMiddleware = createSagaMiddleware();
    const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
    
    //Creacíon del Store
    const store = createStore(reducer,preloaderState,enhancer);
    
    //Se ejecuta la saga raiz
    sagaMiddleware.run(rootSaga)

    //Me suscribo a los cambios para guardalos mediante async storage
    store.subscribe(()=>{
        const {user, system} = store.getState();
        const reduxStore = {user, system}
        AsyncStorage.setItem('reduxStore',JSON.stringify(reduxStore))
    })
    
    return store;
}


