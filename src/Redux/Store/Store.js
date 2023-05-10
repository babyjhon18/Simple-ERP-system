import { createStore, combineReducers } from 'redux';
import { LoginReduser } from '../LoginReduser';
import { DataBaseReduser } from '../DataBaseReduser';
import { ClientsReduser } from '../ClientReduser';
import { UtilsReduser } from '../UtilsReduser';

const rootReduser = combineReducers({
    dataBaseReduser: DataBaseReduser,
    clientsReduser: ClientsReduser,
    loginReduser: LoginReduser,
    utilsReduser: UtilsReduser
});

export const store = createStore(rootReduser);