import { SHOW_ADD_MODAL } from "../../Constants/Constants";

export function ShowHideAddModal(value){
    return {
        type: SHOW_ADD_MODAL,
        payload: value
    }
}

// export function ShowHideEditModal(value){
//     return {
//         type: SHOW_EDIT_MODAL,
//         payload: value
//     }
// }
