//dependecies
import { select, put, call, delay, take } from 'redux-saga/effects';

//utils
import moment from 'moment';
import 'moment/locale/es';

//actions
import { setScreenState } from './../ducks/screens/screensActions';

//selectors
import { getShippingTime } from './../ducks/system/systemSelectors';

//constants
import { EMAIL_CONFIRMATION } from '../../navigation/constants';
import { EMAIL_VERIFICATION_SENT } from '../ducks/system/systemConstants';
import { getScreenState } from '../ducks/screens/screensSelectors';





export default function* countdown(){

    yield take(EMAIL_VERIFICATION_SENT)

    const timeView = 20 // Tiempo aproximado que se tarda en ver un correo en la computadora
    const waitingTime = 60 //Tiempo de espera, para volver a enviar un correo
    let remaningTime = waitingTime; //Tiempo restante

    const shippingTime = yield select(getShippingTime)    
    const limitTime = moment(shippingTime).add(waitingTime, 's'); 

    while(remaningTime>1){

        //Se calcula el tiempo restante basandonos en la hora actual y en la hora limite.
        //No se usa el valor de un setInterval, dado que se pausa cuando la app esta en segundo plano.
        const now = moment()
        const duration = moment.duration(limitTime.diff(now)).as('seconds');
        remaningTime = parseFloat(duration).toFixed(0);

        //Marcamos viewed, si pasaron 20 segundos
        const { viewed } = yield select( state => getScreenState(state,EMAIL_CONFIRMATION) )        
        const timeElapsed = waitingTime - remaningTime // Tiempo transcurrido = [tiempo definido de espera] - [tiempo faltante]       

        if((!viewed) && (timeElapsed > timeView)){
            yield put(setScreenState(EMAIL_CONFIRMATION,{viewed:true}))   
        }

        //Dejamos que transcurra un segundo, para evitar más de un renderizado por segundo.
        yield delay(1000)
        
    }

    yield put(setScreenState(EMAIL_CONFIRMATION,{ready:true}))

}