import React, { useEffect, useState } from "react";
import "./ModalViewClients.css";
import { useDispatch } from "react-redux";
import Button from 'react-bootstrap/Button';
import { EDIT_CLIENT, UPDATE_DELETE_CLIENT, errorMessageData, errorMessageDataEntry } from "../../Constants/Constants";

function ModalViewClients(props){

    const dispatch = useDispatch();
    const [Name, setName] = useState(props.props.name);
    const [phoneNumber, setPhoneNumberChange] = useState(props.props.phoneNumber);
    const [clientCity, setClientCity] = useState(props.props.clientCity);
    const [responsiblePerson, setResponsiblePerson] = useState(props.props.responsiblePerson);
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

    async function EditClient(){
        var dataToSend = {
            "id": props.props.id,
            "name": Name,
            "phoneNumber": phoneNumber,
            "clientCity": clientCity,
            "responsiblePerson": responsiblePerson,
            "showHideValue": false,
            "showHideReportValue": false,
        }
        console.log(dataToSend);
        var result = await fetch(UPDATE_DELETE_CLIENT + props.props.id,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
            }).then((responce) => {
                console.log(responce.status);
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
            dispatch({type: EDIT_CLIENT, payload: {editedClientData: dataToSend}})
        }
    }

    return (
        <div>
            <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "200px", maxWidth: "400px"}}>
                Client name &nbsp;<input onChange={nameChange} defaultValue={Name} className="field form-control" placeholder="Name" required></input>
            </div>
            <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "200px", maxWidth: "300px"}}>
                Client phone number &nbsp;<input value={phoneNumber} className="field form-control" 
                    onChange={phoneNumberChange} placeholder="Phone number"></input>
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "150px", maxWidth: "200px"}}>
                Client city &nbsp;<input className="field form-control" defaultValue={clientCity} 
                    onChange={cityChange} placeholder="City"></input>
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "200px", maxWidth: "200px"}}>
                Client responsible person &nbsp;<input className="field form-control" defaultValue={responsiblePerson} 
                    onChange={responsiblePersonChange} placeholder="Responsible person"></input>
            </div>
            <div className="incomeValue" style={{display: errorMessage}}>
                {errorMessageDataEntry}
            </div>
            <div className="saveChanges">
                <Button onClick={EditClient}>
                    Save changes
                </Button>
            </div>
        </div>
      );
};

export default ModalViewClients;
