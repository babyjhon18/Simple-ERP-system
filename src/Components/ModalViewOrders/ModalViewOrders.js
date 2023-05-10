import React, { useEffect, useState } from "react";
import "./ModalViewOrders.css";
import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import { EDIT_ORDER, UPDATE_DELETE_ORDERS, errorMessageDataEntry } from "../../Constants/Constants";

function ModalViewOrders(props){

    const dispatch = useDispatch();
    const [selectedClient, setSelectedClient] = useState(props.props.clientID);
    const [Name, setName] = useState(props.props.name);
    const [Price, setPrice] = useState(props.props.price);
    const [date, setDate] = useState(new Date());
    const [deadLineDate, setDeadLineDate] = useState(new Date());
    const [status, setStatus] = useState(props.props.status);
    const clients = useSelector(state => state.dataBaseReduser);
    const [errorMessage, setErrorMessage] = useState("none");

    useEffect(()=>{
        setDate(props.props.date.split('T')[0]);
        setDeadLineDate(props.props.deadLineDate.split('T')[0])
    },[])

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

    async function EditOrder(){
        var dataToSend = {
            "id": props.props.id,
            "clientID": selectedClient,
            "price": Price,
            "date": date + "T00:00:00",
            "deadLineDate": deadLineDate + "T00:00:00",
            "status": status,
            "name": Name,
            "showHideValue": false
        }
        var result = await fetch(UPDATE_DELETE_ORDERS + props.props.id,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
            }).then((responce) => {
            if(responce.status == 200){
                return responce.json();
            }
            else{
                setErrorMessage("block");
                return null
            }
        });  
        if(result != null){
            setErrorMessage("none");
            dispatch({type: EDIT_ORDER, payload: {editedOrderData: dataToSend}})
        }
    }

    return (
        <div>
            <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "200px", maxWidth: "400px"}}>
                Order name &nbsp;<input onChange={nameChange} className="field form-control" placeholder="Name" 
                    defaultValue={props.props.name}></input>
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "100px", maxWidth: "300px"}}>
                Client &nbsp; <select className="field form-control" onChange={selectClientChange}>
                    {
                        clients.ordersList.clients && clients.ordersList.clients.map((client, index) => (
                            props.props.clientID == client.id ? 
                            <option selected key={index} value={client.id}>{client.name}</option> : 
                            <option key={index} value={client.id}>{client.name}</option>
                        )) 
                    }
                </select>
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "150px", maxWidth: "200px"}}>
                Order price &nbsp;<input onChange={priceChange} className="field form-control" placeholder="Price" 
                    defaultValue={props.props.price}></input>
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "200px", maxWidth: "400px"}}>
                Order date &nbsp;<input onChange={dateChange} className="field form-control" type="date" value={date}></input>
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "200px", maxWidth: "400px"}}>
                Order deadline &nbsp;<input onChange={deadLineDateChange} className="field form-control" type="date" value={deadLineDate}></input>
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
                <Button onClick={EditOrder}>
                    Save Changes
                </Button>
            </div>
        </div>
      );
};

export default ModalViewOrders;
