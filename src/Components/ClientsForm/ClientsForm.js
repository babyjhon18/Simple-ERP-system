import ClientRow from '../ClientRow/ClientRow.js';
import '../ClientsForm/ClientsForm.css';
import { GET_CREATE_CLIENTS, UPDATE_CLIENTS_VIEW, rowClientHeader } from '../../Constants/Constants';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ClientForm(){

    const dispatch = useDispatch();
    const clients = useSelector(state => state.clientsReduser);
    const [firstStart, setFirstStart] = useState(true);

    useEffect(() => {
        if(firstStart){
            fetchData();
            setFirstStart(false);
        };
    }, [clients])

    async function fetchData() {
        const response = await fetch(GET_CREATE_CLIENTS);
        const result = await response.json();
        if(response.status == 200){
            dispatch({type: UPDATE_CLIENTS_VIEW, payload: result});
        }
    }

    return(
        <div>
            <div className="header">
                <ClientRow client={rowClientHeader} Header={true}></ClientRow>
            </div>
            <div>
            {
                clients.clientsList.clients && clients.clientsList.clients.map((client, index) => (
                    <div>
                        <ClientRow key={index} client={client}></ClientRow>
                    </div>
                )
            )}
            </div>
        </div>
    )
}

export default ClientForm;