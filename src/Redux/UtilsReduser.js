import { SHOW_ADD_MODAL } from "../Constants/Constants"

const initialState = {
    showHideAddModal: false,
}

export function UtilsReduser(state = initialState, action){
    switch(action.type){
        case SHOW_ADD_MODAL:
            return { 
                ...state,
                showHideAddModal: action.payload
            }
        default: 
            return state
    }
}