import React, { useState } from "react";
import "./ModalViewOrders.css";
import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import { ADD_NEW_ORDER, GET_CREATE_ORDERS, SHOW_ADD_MODAL, errorMessageDataEntry } from "../../Constants/Constants";

function ModalViewNewOrders(props){

    const clients = useSelector(state => state.dataBaseReduser);
    const dispatch = useDispatch();
    const [selectedClient, setSelectedClient] = useState();
    const [Name, setName] = useState();
    const [Price, setPrice] = useState();
    const [date, setDate] = useState(new Date());
    const [deadLineDate, setDeadLineDate] = useState(new Date());
    const [status, setStatus] = useState(0);
    const [errorMessage, setErrorMessage] = useState("none");

    const nameChange = (event) => {
        setName(event.target.value);
    }

    const priceChange = (event) => {
        setPrice(event.target.value);
    }

    const selectClientChange = (event) => {
        setSelectedClient(event.target.value);
    }

    const dateChange = (event) => {
        setDate(event.target.value);
    }

    const deadLineDateChange = (event) => {
        setDeadLineDate(event.target.value);
    }

    const checkChange = (event) => {
        event.target.checked ? 
        setStatus(1) : setStatus(0)
    }

    async function AddNewOrder(){
        var dataToSend = {
            "clientID": selectedClient,
            "price": Price,
            "date": date,
            "deadLineDate": deadLineDate,
            "status": status,
            "name": Name,
        }
        var result = await fetch(GET_CREATE_ORDERS,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
            }).then((responce) => {
            if(responce.status == 200){
                return responce.json()
            }
            else{
                setErrorMessage("block");
                return null
            }
        });  
        if(result != null){
            setErrorMessage("none");
            dispatch({type: SHOW_ADD_MODAL, payload: false})
            dataToSend["id"] = result;
            dispatch({type: ADD_NEW_ORDER, payload: {newOrderData: dataToSend}})
        }
    }

    return (
        <div>
            <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "200px", maxWidth: "400px"}}>
                Order name &nbsp;<input onChange={nameChange} className="field form-control" placeholder="Name"></input>
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "100px", maxWidth: "300px"}}>
                Client &nbsp; <select className="field form-control" onChange={selectClientChange}>
                    <option value="-1">Select client</option>
                    {
                        clients.ordersList.clients && clients.ordersList.clients.map((client, index) => ( 
                            <option key={index} value={client.id}>{client.name}</option>
                        )) 
                    }
                </select>
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "150px", maxWidth: "200px"}}>
                Order price &nbsp;<input className="field form-control" onChange={priceChange} placeholder="Price"></input>
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "200px", maxWidth: "400px"}}>
                Order date &nbsp;<input className="field form-control" onChange={dateChange} type="date"></input>
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "200px", maxWidth: "400px"}}>
                Order deadline &nbsp;<input className="field form-control" onChange={deadLineDateChange} type="date"></input>
            </div>
            <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "200px", maxWidth: "400px"}}>
                {
                    props.props.status == 1 ? 
                    <div onChange={checkChange} className="completed">Order completed &nbsp;<input type="checkbox" defaultChecked></input></div> :
                    <div onChange={checkChange} className="completed">Order completed &nbsp;<input type="checkbox"></input></div>
                } 
            </div>
            <div className="errorMessage" style={{display: errorMessage}}>
                {errorMessageDataEntry}
            </div>
            <div className="saveChanges">
                <Button onClick={AddNewOrder}>
                    Add new order
                </Button>
            </div>
        </div>
      );
};

export default ModalViewNewOrders;
