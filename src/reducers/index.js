import {combineReducers} from 'redux';
import authReducer from './auth-reducer';
import adminReducer from './admin-reducer';
import userReducer from "./user-reducer";
import playgroundReducer from './playground-reducer';
import uiEffectReducer from './ui-effect-reducer';
import {connectRouter} from 'connected-react-router';
import settingReducer from './setting-reducer';

export default function createRootReducer(history) {
    return combineReducers({
        router: connectRouter(history),
        authReducer,
        userReducer,
        adminReducer,
        playgroundReducer,
        uiEffectReducer,
        settingReducer
    });
}
