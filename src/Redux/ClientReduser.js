import { ADD_CLIENT, DELETE_CLIENT, EDIT_CLIENT, 
    SHOW_EDIT_MODAL_CLIENTS, UPDATE_CLIENTS_VIEW, SHOW_REPORT_MODAL_CLIENT } from "../Constants/Constants";

const initialState = {
    clientsList: {
        clients: []
    }
}

export function ClientsReduser(state = initialState, action){
    switch(action.type){
        case UPDATE_CLIENTS_VIEW:
            var listWithStates = [];
            action.payload.clients.map((client) => {
                var newItem = client;
                newItem["showHideValue"] = false;
                newItem["showHideReportValue"] = false;
                listWithStates.push(newItem);
            })
            return { 
                ...state,
                clientsList: {
                    clients: listWithStates,
                } 
            }
        case SHOW_EDIT_MODAL_CLIENTS:
            var clientIndex = state.clientsList.clients.findIndex((client => client.id == action.payload.itemID));
            state.clientsList.clients[clientIndex].showHideValue = action.payload.visible;
            return{
                ...state,
                clientsList:{
                    clients: state.clientsList.clients
                }
            }
        case SHOW_REPORT_MODAL_CLIENT:
            var clientIndex = state.clientsList.clients.findIndex((client => client.id == action.payload.itemID));
            state.clientsList.clients[clientIndex].showHideReportValue = action.payload.visible;
            return{
                ...state,
                clientsList:{
                    clients: state.clientsList.clients
                }
            }
        case ADD_CLIENT:
            state.clientsList.clients.push(action.payload.newClientData);
            return{
                ...state,
                clientsList:{
                    clients: state.clientsList.clients
                }
            }
        case EDIT_CLIENT:
            var clientIndex = state.clientsList.clients.findIndex((client => client.id == action.payload.editedClientData.id));
            state.clientsList.clients[clientIndex] = action.payload.editedClientData;
            return{
                ...state,
                clientsList:{
                    clients: state.clientsList.clients
                }
            }
        case DELETE_CLIENT:
            return {
                ...state,
                clientsList:{
                    clients: state.clientsList.clients.filter((item, index) => item.id !== action.payload)
                } 
            }
        default:
            return state
    }
}