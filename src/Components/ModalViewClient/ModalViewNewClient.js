import React, { useState } from "react";
import "./ModalViewClients.css";
import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import { ADD_CLIENT, GET_CREATE_CLIENTS, SHOW_ADD_MODAL, errorMessageData, errorMessageDataEntry } from "../../Constants/Constants";

function ModalViewNewClient(){

    const dispatch = useDispatch();
    const [Name, setName] = useState();
    const [phoneNumber, setPhoneNumberChange] = useState();
    const [clientCity, setClientCity] = useState();
    const [responsiblePerson, setResponsiblePerson] = useState();
    const [errorMessage, setErrorMessage] = useState("none");

    const nameChange = (event) => {
        setName(event.target.value);
    }
    
    function containsOnlyNumbers(value) {
        return /^([0-9,+]+-)*([0-9,+]+)$/.test(value);
    }

    const phoneNumberChange = (event) => {
        if(containsOnlyNumbers(event.target.value) == true){
            setPhoneNumberChange(event.target.value);
        }
    }

    const cityChange = (event) => {
        setClientCity(event.target.value);
    }

    const responsiblePersonChange = (event) => {
        setResponsiblePerson(event.target.value);
    }

    async function AddNewClient(){
        var dataToSend = {
            "name": Name,
            "phoneNumber": '+' + phoneNumber,
            "clientCity": clientCity,
            "responsiblePerson": responsiblePerson 
        }
        var result = await fetch(GET_CREATE_CLIENTS,
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
                return null;
            }
        });  
        if(result != null){
            setErrorMessage("none");
            dispatch({type: SHOW_ADD_MODAL, payload: false})
            dataToSend["id"] = result;
            dispatch({type: ADD_CLIENT, payload: {newClientData: dataToSend}})
        }
    }

    return (
        <div>
            <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "200px", maxWidth: "400px"}}>
                Client name &nbsp;<input onChange={nameChange} className="field form-control" placeholder="Name"></input>
            </div>
            <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "200px", maxWidth: "300px"}}>
                Client phone number &nbsp;<input type="number" className="field form-control" onChange={phoneNumberChange} 
                    placeholder="Phone number"></input>
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "150px", maxWidth: "200px"}}>
                Client city &nbsp;<input className="field form-control" onChange={cityChange} placeholder="City"></input>
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "200px", maxWidth: "200px"}}>
                Client responsible person &nbsp;<input className="field form-control" onChange={responsiblePersonChange} 
                    placeholder="Responsible person"></input>
            </div>
            <div className="incomeValue" style={{display: errorMessage}}>
                {errorMessageDataEntry}
            </div>
            <div className="saveChanges">
                <Button onClick={AddNewClient}>
                    Add new client
                </Button>
            </div>
        </div>
      );
};

export default ModalViewNewClient;
