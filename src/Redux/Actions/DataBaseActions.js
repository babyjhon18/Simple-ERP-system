import { ADD_NEW_ORDER, DELETE_ORDER, EDIT_ORDER, UPDATE_ORDERS_VIEW } from "../../Constants/Constants";

export function UpdateOrdersView(){
    return{
        type: UPDATE_ORDERS_VIEW,
    }
}

export function AddOrder(newOrderData){
    return {
        type: ADD_NEW_ORDER,
        payload: newOrderData
    }
}

export function EditOrder(editedOrderData){
    return {
        type: EDIT_ORDER,
        payload: editedOrderData
    }
}

export function DeleteOrder(orderId){
    return {
        type: DELETE_ORDER,
        payload: orderId
    }
}