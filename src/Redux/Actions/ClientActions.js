import { ADD_CLIENT, DELETE_CLIENT, EDIT_CLIENT, UPDATE_CLIENTS_VIEW } from "../../Constants/Constants";

export function UpdateClientsView(){
    return{
        type: UPDATE_CLIENTS_VIEW,
    }
}

export function AddClient(newClientData){
    return {
        type: ADD_CLIENT,
        payload: newClientData
    }
}

export function EditClient(editedClientData){
    return {
        type: EDIT_CLIENT,
        payload: editedClientData
    }
}

export function DeleteClient(clientId){
    return {
        type: DELETE_CLIENT,
        payload: clientId
    }
}