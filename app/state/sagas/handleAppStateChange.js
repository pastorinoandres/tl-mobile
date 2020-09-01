
//dependecies
import { AppState } from 'react-native';
import { eventChannel } from 'redux-saga';
import { call, put, take, select, cancelled } from 'redux-saga/effects';

//utils
import moment from 'moment';
import 'moment/locale/es';

//selectors
import { getScreenState } from './../ducks/screens/screensSelectors';
import { getShippingTime } from './../ducks/system/systemSelectors';

//actions
import { setScreenState } from './../ducks/screens/screensActions';

//constants
import { EMAIL_VERIFICATION_SENT } from '../ducks/system/systemConstants';
import { EMAIL_CONFIRMATION } from '../../navigation/constants';
import { VERIFY_EMAIL_CHECK } from './../ducks/system/systemConstants';




export default function* handleAppStateChange(){

    yield take(EMAIL_VERIFICATION_SENT)

    const appStateChannel = yield call(createAppStateChannel)

    let appState = AppState.currentState;
    let startTime;

    try {

        const waitingTime = 60 //Tiempo de espera, para volver a enviar un correo
        const shippingTime = yield select(getShippingTime)    
        const limitTime = moment(shippingTime).add(waitingTime, 's');
        let remaningTime = waitingTime; //Tiempo restante 

        while(true){

            const nextAppState = yield take(appStateChannel)
            const { activeScene } = yield select( state => getScreenState(state,EMAIL_CONFIRMATION))

            const now = moment()
            const duration = moment.duration(limitTime.diff(now)).as('seconds');
            remaningTime = parseFloat(duration).toFixed(0);
            
            //Seteamos dicho valor en Redux
            yield put(setScreenState(EMAIL_CONFIRMATION,{remaningTime}))

            if( appState === 'active' && (nextAppState === 'inactive' || nextAppState === 'background' )){

                /*
                Hacemos una marca en el tiempo para indicar que la aplicación paso a estar en segundo plano.
                Esto lo hacemos solo si:
                    - El correo fue enviado, incluso habiendose chekeado con error;
                    - Esta marca no fue registrada previamente, para no reescribirla con tanta frecuencia.
                */
               
                if((activeScene === 'sent' || activeScene === 'error') &&  (!startTime)){
                    startTime = moment() 
                }
                
            }

            if((appState === 'inactive' || appState === 'background' ) && nextAppState === 'active'){
                
                const timeStamp = moment()
                const duration = moment.duration(timeStamp.diff(startTime)).as('seconds');

                /*
                Analizamos el tiempo transcurrido desde que seteamos la marca de tiempo 
                hasta que la aplicación haya vuelto al primer plano.
                Si transcurrieron más de 8 segundos, chequeamos si se válido el correo, llamando a la función correspondiente.
                */

                if(duration > 8){                
                    yield put({type:VERIFY_EMAIL_CHECK})
                    startTime = undefined;
                }

            }

            appState = nextAppState

        }
        
    }
    catch(error){

        console.log(error)    

    }
    finally{

        if(yield cancelled()){
            appStateChannel.close()
        }

    }

    

}


function createAppStateChannel(){

    return eventChannel( emitter => {

        AppState.addEventListener('change', emitter);
        return () => AppState.removeEventListener('change', emitter)

    })

}

