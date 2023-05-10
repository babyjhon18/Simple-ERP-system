//Other constants
export const rowClientHeader = {
    id: "ID", 
    name: "Name",
    phoneNumber: "Phone Number",
    clientCity: "Client city",
    responsiblePerson: "Responsible person"
}
export const rowOrderHeader = {
    id: "ID", 
    name: "Name",
    clientID: "Client",
    price: "Price",
    date: "Order date",
    deadLineDate: "Deadline",
    status: "Status"
}
//Error messages
export const errorMessageLogin = "Please make sure, that you entered correct manager number!";
export const errorMessageData = "Please make sure, that you entered correct data!";
export const errorMessageOnClientDelete = 
    "Sorry, but you can't delete this client, because it have connected orders to it. You can delete connected orders and try again!";
export const errorMessageDataEntry = "Failed to send data! Please make sure, that fields not empty and data is correct!";
//Actions
//Login actions
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
//Clients actions
export const UPDATE_CLIENTS_VIEW = "UPDATE_CLIENTS_VIEW";
export const ADD_CLIENT = "ADD_CLIENT";
export const EDIT_CLIENT = "EDIT_CLIENT";
export const DELETE_CLIENT = "DELETE_CLIENT";
//DataBaseActions
export const UPDATE_ORDERS_VIEW = "UPDATE_ORDERS_VIEW";
export const ADD_NEW_ORDER = "ADD_NEW_ORDER";
export const EDIT_ORDER = "EDIT_ORDER"; 
export const DELETE_ORDER = "DELETE_ORDER";
//UtilsActions
export const SHOW_REPORT_MODAL_CLIENT = "SHOW_REPORT_MODAL_CLIENT";
export const SHOW_EDIT_MODAL_ORDERS = "SHOW_EDIT_MODAL_ORDERS";
export const SHOW_EDIT_MODAL_CLIENTS = "SHOW_EDIT_MODAL_CLIENTS";
export const SHOW_ADD_MODAL = "SHOW_ADD_MODAL";
//Links
export const LOG_IN_LINK = "http://37.17.58.180:8086/api/Login"
export const GET_CREATE_ORDERS = "http://37.17.58.180:8086/api/Order";
export const GET_CREATE_CLIENTS = "http://37.17.58.180:8086/api/Client";
export const UPDATE_DELETE_ORDERS = "http://37.17.58.180:8086/api/Order?orderId=";
export const UPDATE_DELETE_CLIENT = "http://37.17.58.180:8086/api/Client?clientId=";
export const GET_INCOME_BY_CLIENT = "http://37.17.58.180:8086/api/Utils/IncomeFordate"

