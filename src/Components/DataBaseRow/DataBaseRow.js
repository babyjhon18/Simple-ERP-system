import '../DataBaseRow/DataBaseRow.css';
import editIcon from '../../images/editIcon.png';
import deleteIcon from '../../images/deleteIcon.png';
import addIcon from '../../images/addIcon.png';
import exitIcon from '../../images/exitIcon.png';
import refreshIcon from '../../images/refreshIcon.png'
import { useDispatch, useSelector } from 'react-redux';
import { 
    DELETE_ORDER,
    GET_CREATE_ORDERS,
    LOG_OUT, 
    SHOW_ADD_MODAL, 
    SHOW_EDIT_MODAL_ORDERS, 
    UPDATE_DELETE_ORDERS, 
    UPDATE_ORDERS_VIEW 
} from '../../Constants/Constants';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalViewOrders from '../ModalViewOrders/ModalViewOrders';
import ModalViewNewOrders from '../ModalViewOrders/ModalViewNewOrder';

function DataBaseRow(props){

    const utils = useSelector(state => state.utilsReduser);
    const orders = useSelector(state => state.dataBaseReduser);
    const dispatch = useDispatch();
    const [deadLineFormat, setDeadLineFormat] = useState();
    const [dateFormat, setDateFormat] = useState();
    const [clientName, setClientName] = useState();

    const handleEditClose = () => dispatch({type: SHOW_EDIT_MODAL_ORDERS, payload:{visible: false, itemID: props.order.id}})
    const handleEditShow = () => dispatch({type: SHOW_EDIT_MODAL_ORDERS, payload:{visible: true, itemID: props.order.id} })

    const handleAddClose = () => dispatch({type: SHOW_ADD_MODAL, payload: false})
    const handleAddShow = () => dispatch({type: SHOW_ADD_MODAL, payload: true})

    useEffect(() => {
        orders.ordersList.clients.find(element => { 
            if(element.id == props.order.clientID){
                setClientName(element.name);
            }  
        })
        let formattedOrderDate = props.order.date.split('T')[0];
        formattedOrderDate = formattedOrderDate.split('-').reverse().join('.');
        setDateFormat(formattedOrderDate);
        let formattedDeadLineDate = props.order.deadLineDate.split('T')[0];
        formattedDeadLineDate = formattedDeadLineDate.split('-').reverse().join('.');
        setDeadLineFormat(formattedDeadLineDate);
    }, [orders])

    const ExitClick = () => {
        dispatch({type: LOG_OUT, payload: {isLoggedIn: false, managerNumber: -1}})
    }

    const DeleteClick = () => {
        fetch(UPDATE_DELETE_ORDERS + props.order.id, 
            { method: 'DELETE' }).then((responce) => {
            if(responce.status == 200){
                dispatch({type: DELETE_ORDER, payload: props.order.id})
            }
        });  
    }

    const RefreshClick = () => {
        fetchData();
    }

    async function fetchData() {
        const response = await fetch(GET_CREATE_ORDERS);
        const result = await response.json();
        if(response.status == 200){
            dispatch({type: UPDATE_ORDERS_VIEW, payload: result});
        }
    }

    if(props.Header){
        return(
            <div className="header row col-lg-12">
                <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "50px", maxWidth: "100px"}}>
                    {props.order.id}
                </div>
                <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "200px", maxWidth: "400px"}}>
                    {props.order.name}
                </div>
                <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "250px", maxWidth: "400px"}}>
                    {props.order.clientID}
                </div>
                <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "150px", maxWidth: "200px"}}>
                    {props.order.price}
                </div>
                <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "150px", maxWidth: "250px"}}>
                    {props.order.date}
                </div>
                <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "150px", maxWidth: "250px"}}>
                    {props.order.deadLineDate}
                </div>
                <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "100px", maxWidth: "350px"}}>
                    {props.order.status}
                </div>
                <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2 row imgButtons" style={{minWidth: "50px"}}>
                    <div onClick={RefreshClick} style={{minWidth: "50px", maxWidth: "50px"}}>
                        <img className="headerButtons" src={refreshIcon}></img>
                    </div>
                    <div onClick={handleAddShow} style={{minWidth: "50px", maxWidth: "50px"}}>
                        <img className="headerButtons" src={addIcon}></img>
                    </div>
                    <Modal show={utils.showHideAddModal} onHide={handleAddClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Add new order</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ModalViewNewOrders props={props.order}></ModalViewNewOrders>
                            </Modal.Body>
                    </Modal>
                    <div onClick={ExitClick} style={{minWidth: "50px", maxWidth: "50px"}}>
                        <img className="headerButtons" src={exitIcon}></img>
                    </div>
                </div>
            </div>
        )
    }
    else{
        return(
            <div className="defaultRow row col-lg-12">
                <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "50px", maxWidth: "100px"}}>
                    {props.order.id}
                </div>
                <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "150px", maxWidth: "350px"}}>
                    {props.order.name}
                </div>
                <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "250px", maxWidth: "400px"}}>
                    {clientName}
                </div>
                <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "150px", maxWidth: "200px"}}>
                    {props.order.price}
                </div>
                <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "150px", maxWidth: "250px"}}>
                    {dateFormat}
                </div>
                <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "150px", maxWidth: "250px"}}>
                    {deadLineFormat}
                </div>
                <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "150px", maxWidth: "350px"}}>
                    {
                        props.order.status == 0 ? 
                        <div className='inProcessingOrder'>&#9673; In processing</div> 
                        : 
                        <div className='completedOrder'>&#9673; Completed</div>
                    } 
                </div>
                <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2 row imgButtons">
                    <div onClick={handleEditShow} style={{minWidth: "50px", maxWidth: "50px"}}>
                        <img className="rowButtons" src={editIcon}></img>
                    </div>
                    <Modal id={"editModal" + props.order.id} show={props.order.showHideValue} onHide={handleEditClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Edit Order #{props.order.id} - {props.order.name}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ModalViewOrders props={props.order}></ModalViewOrders>
                            </Modal.Body>
                    </Modal>
                    <div onClick={() => DeleteClick()} style={{minWidth: "50px", maxWidth: "50px"}}>
                        <img className="rowButtons" src={deleteIcon}></img>
                    </div>
                </div>
            </div>
        )
    }
}

export default DataBaseRow;