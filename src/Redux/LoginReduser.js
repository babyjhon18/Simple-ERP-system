import { LOG_IN, LOG_OUT } from "../Constants/Constants";

const initialState = {
    isLoggedIn: false,
    managerNumber: -1
};

export function LoginReduser(state = initialState, action){
    switch(action.type){
        case LOG_IN:
            const newState = state;
            newState.isLoggedIn = action.payload.isLoggedIn;
            newState.managerNumber = action.payload.managerNumber; 
            return {...state, newState}
        case LOG_OUT:
            const defaultState = state;
            defaultState.isLoggedIn = action.payload.isLoggedIn;
            defaultState.managerNumber = action.payload.managerNumber; 
            return {...state, defaultState}
        default:
            return state;
    }
}