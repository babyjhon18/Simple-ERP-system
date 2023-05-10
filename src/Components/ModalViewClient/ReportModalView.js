import React, { useState } from "react";
import "./ModalViewClients.css";
import Button from 'react-bootstrap/Button';
import { GET_INCOME_BY_CLIENT, errorMessageData } from "../../Constants/Constants";

function ReportModalView(props){

    const [dateTo, setDateTo] = useState();
    const [dateFrom, setDateFrom] = useState();
    const [dateToFormatted, setDateToFormatted] = useState();
    const [dateFromFormatted, setDateFromFormatted] = useState();
    const [showIncome, setShowIncome] = useState("none");
    const [showError, setShowError] = useState("none");
    const [incomValue, setIncomeValue] = useState(0);

    const dateFromChange = (event) => {
        setDateFrom(event.target.value);
    }

    const dateToDateChange = (event) => {
        setDateTo(event.target.value);
    }

    async function ReportByClient(){
        var dataToSend = {
            "clientId": props.props.id,
            "dateFrom": dateFrom + "T00:00:00",
            "dateTo": dateTo + "T00:00:00"
        }
        if(dateFrom == "" || dateTo == ""){
            setShowIncome("none");
            setShowError("block")
        }
        else{
            var result = await fetch(GET_INCOME_BY_CLIENT,
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
                        setShowError("block");
                        return null;
                    }
                });  
                if(result != null){
                    setShowIncome("block");
                    setShowError("none");
                    setIncomeValue(result);
                    let formattedDateFrom = dateFrom.split('-').reverse().join('.');
                    setDateFromFormatted(formattedDateFrom);
                    let formattedDateTo = dateTo.split('-').reverse().join('.');
                    setDateToFormatted(formattedDateTo);
                }
        }
    }

    return (
        <div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "200px", maxWidth: "400px"}}>
                Date from &nbsp;<input onChange={dateFromChange} className="field form-control" type="date" value={dateFrom}></input>
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "200px", maxWidth: "400px"}}>
                Date to &nbsp;<input onChange={dateToDateChange} className="field form-control" type="date" value={dateTo}></input>
            </div>
            <div className="incomeValue" style={{display: showIncome}}>
                Income from {dateFromFormatted} to {dateToFormatted}&nbsp;equals:&nbsp;{incomValue} crowns!
            </div>
            <div className="incomeValue" style={{display: showError}}>
                {errorMessageData}
            </div>
            <div className="saveChanges">
                <Button onClick={ReportByClient}>
                    Get income
                </Button>
            </div>
        </div>
      );
};

export default ReportModalView;
