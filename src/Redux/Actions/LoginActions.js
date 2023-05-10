import { LOG_IN, LOG_OUT } from "../../Constants/Constants";

export function Login(){
    return {
        type: LOG_IN,
    }
}

export function Logout(){
    return{
        type: LOG_OUT,
    }
}