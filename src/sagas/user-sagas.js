import {takeLatest, call, put} from 'redux-saga/effects';
import {showLoading, hideLoading} from 'react-redux-loading-bar'
import APIs from '../apis';
import {} from '../actions';
import {GET_ALL_USERS, POST_LOGIN_BY_THIRD_PARTY,} from "../actions/action-types";
import {updateOwnContests} from "../actions";
import {updateAllUsers} from "../actions";


/*-----saga effects-----*/

export function* getAllUsersSaga() {
    try {
        yield put(showLoading());
        const response = yield call(APIs.getAllUsers);
        if (!response.error) {
            yield put(updateAllUsers(response.data));
        }
    } catch (error) {
        console.log('get all users failed: ', error);
    } finally {
        yield put(hideLoading());
    }
}


/*-----saga watchers-----*/
function* getAllUsersWatcherSaga() {
    yield takeLatest(GET_ALL_USERS, getAllUsersSaga);
}

export default [
    getAllUsersWatcherSaga(),
];
