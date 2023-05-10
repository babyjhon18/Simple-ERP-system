import { ADD_NEW_ORDER, DELETE_ORDER, EDIT_ORDER, SHOW_EDIT_MODAL_ORDERS, UPDATE_ORDERS_VIEW } from "../Constants/Constants";

const initialState = {
    ordersList: {
        orders: [],
        clients: []
    }
}

export function DataBaseReduser(state = initialState, action){
    switch(action.type){
        case UPDATE_ORDERS_VIEW:
            var listWithStates = [];
            action.payload.orders.map((order) => {
                var newItem = order;
                newItem["showHideValue"] = false;
                listWithStates.push(newItem);
            })
            return { 
                ...state,
                ordersList: {
                    orders: listWithStates,
                    clients: action.payload.clients
                }
            }
        case SHOW_EDIT_MODAL_ORDERS:
            var orderIndex = state.ordersList.orders.findIndex((order => order.id == action.payload.itemID));
            state.ordersList.orders[orderIndex].showHideValue = action.payload.visible;
            return { 
                ...state,
                ordersList: {
                    orders: state.ordersList.orders,
                    clients: state.ordersList.clients
                }
            }
        case ADD_NEW_ORDER: 
            state.ordersList.orders.push(action.payload.newOrderData);
            return{
                ...state,
                ordersList: {
                    orders: state.ordersList.orders,
                    clients: state.ordersList.clients
                }
            }
        case EDIT_ORDER:
            var orderIndex = state.ordersList.orders.findIndex((order => order.id == action.payload.editedOrderData.id));
            state.ordersList.orders[orderIndex] = action.payload.editedOrderData;
            return { 
                ...state,
                ordersList: {
                    orders: state.ordersList.orders,
                    clients: state.ordersList.clients
                }
            }
        case DELETE_ORDER:
            return {
                ...state,
                ordersList: {
                    orders: state.ordersList.orders.filter((item, index) => item.id !== action.payload),
                    clients: state.ordersList.clients
                }
            }
        default: 
            return state
    }
}