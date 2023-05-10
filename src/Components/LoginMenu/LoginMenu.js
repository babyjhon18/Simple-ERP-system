import './LoginMenu.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LOG_IN, LOG_IN_LINK, errorMessageLogin } from '../../Constants/Constants';

function LoginMenu(){

    const [managerID, setManagerID] = useState();
    const [errorMessageFlag, setErrorMessage] = useState(false);
    const dispatch = useDispatch();

    const LoginClick = () => {
        var dataToSend = {
            "managerNumber": managerID
        }
        fetch(LOG_IN_LINK,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
            }).then((responce) => {
            if(responce.status == 200){
                dispatch({type: LOG_IN, payload: {isLoggedIn: true, managerNumber: managerID}})
            }
            else{
                setErrorMessage(true);
            }
        });  
        
    }

    const loginInputChange = (event) => {
        setManagerID(event.target.value);
    }

    return(
        <div className='startMenu'> 
        <div className='rowMain'>
            <div className='col' style={{minWidth: "100px", maxWidth: "350px", margin: "auto"}}>Manager number: </div>
            <div className='col'>
                <input className="managerName" onChange={loginInputChange} style={{minWidth: "100px", maxWidth: "350px"}} type={"text"}></input>
            </div>
        </div>
        <div>
            <button className='logIn' onClick={LoginClick}>Log in</button>
        </div>  
        {   
            errorMessageFlag ?
            <div>{errorMessageLogin}</div> 
            : 
            <div></div>
        }
    </div>
);
}

export default LoginMenu;