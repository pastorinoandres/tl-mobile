
import { combineReducers} from 'redux';
import system from './ducks/system/systemReducer';
import user from './ducks/user/userReducer';
import screens from './ducks/screens/screensReducer'


export default combineReducers({
   system,
   user,
   screens
});