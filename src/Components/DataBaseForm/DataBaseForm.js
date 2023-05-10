import '../DataBaseForm/DataBaseForm.css';
import { GET_CREATE_ORDERS, UPDATE_ORDERS_VIEW, rowOrderHeader } from '../../Constants/Constants';
import DataBaseRow from '../DataBaseRow/DataBaseRow';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function DataBaseForm(){

    const dispatch = useDispatch();
    const orders = useSelector(state => state.dataBaseReduser);
    const [firstStart, setFirstStart] = useState(true);

    useEffect(() => {
        if(firstStart){
            fetchData();
            setFirstStart(false);
        };
    }, [orders])

    async function fetchData() {
        const response = await fetch(GET_CREATE_ORDERS);
        const result = await response.json();
        if(response.status == 200){
            dispatch({type: UPDATE_ORDERS_VIEW, payload: result});
        }
    }

    return(
        <div>
            <div className="header">
                <DataBaseRow order={rowOrderHeader} Header={true}></DataBaseRow>
            </div>
        <div>
        {
            orders.ordersList.orders && orders.ordersList.orders.map((order, index) => (
                <div>
                    <DataBaseRow key={index} order={order}></DataBaseRow>
                </div>
            )
        )}
        </div>
    </div>
    )
}

export default DataBaseForm;
