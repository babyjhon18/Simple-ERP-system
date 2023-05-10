import '../ClientRow/ClientRow.css';
import editIcon from '../../images/editIcon.png';
import deleteIcon from '../../images/deleteIcon.png';
import addIcon from '../../images/addIcon.png';
import exitIcon from '../../images/exitIcon.png';
import refreshIcon from '../../images/refreshIcon.png';
import reportIcon from '../../images/report.png';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { 
    DELETE_CLIENT,
    GET_CREATE_CLIENTS,
    LOG_OUT,
    SHOW_ADD_MODAL,
    SHOW_EDIT_MODAL_CLIENTS,
    SHOW_REPORT_MODAL_CLIENT,
    UPDATE_CLIENTS_VIEW,
    UPDATE_DELETE_CLIENT,
    errorMessageOnClientDelete
} from '../../Constants/Constants';
import ModalViewNewClient from '../ModalViewClient/ModalViewNewClient';
import ModalViewClients from '../ModalViewClient/ModalViewClients';
import ReportModalView from '../ModalViewClient/ReportModalView';
import { useEffect, useState } from 'react';

function ClientRow(props){

    const dispatch = useDispatch();
    const [deleteMessage, setDeletedMessage] = useState(false);

    const utils = useSelector(state => state.utilsReduser);
    const clients = useSelector(state => state.clientsReduser);
    const handleCloseErrorMessage = () => setDeletedMessage(false);
    
    const handleAddClose = () => dispatch({type: SHOW_ADD_MODAL, payload: false})
    const handleAddShow = () => dispatch({type: SHOW_ADD_MODAL, payload: true})

    const handleEditClose = () => dispatch({type: SHOW_EDIT_MODAL_CLIENTS, payload:{visible: false, itemID: props.client.id}})
    const handleEditShow = () => dispatch({type: SHOW_EDIT_MODAL_CLIENTS, payload:{visible: true, itemID: props.client.id} })
    const handleReportShow = () => dispatch({type: SHOW_REPORT_MODAL_CLIENT, payload:{visible: true, itemID: props.client.id} })
    const handleReportClose = () => dispatch({type: SHOW_REPORT_MODAL_CLIENT, payload:{visible: false, itemID: props.client.id} })

    const ExitClick = () => {
        dispatch({type: LOG_OUT, payload: {isLoggedIn: false, managerNumber: -1}})
    }

    useEffect(() => {}, [clients])

    const RefreshClick = () => {
        fetchData();
    }

    const DeleteClick = () => {
        fetch(UPDATE_DELETE_CLIENT + props.client.id, 
            { method: 'DELETE' }).then((responce) => {
                if(responce.status == 200){
                    dispatch({type: DELETE_CLIENT, payload: props.client.id});
                }
                else{
                    setDeletedMessage(true);
                }
        });  
    }

    async function fetchData() {
        const response = await fetch(GET_CREATE_CLIENTS);
        const result = await response.json();
        if(response.status == 200){
            dispatch({type: UPDATE_CLIENTS_VIEW, payload: result});
        }
    }

    if(props.Header){
        return(
            <div className="header row col-lg-12">
                <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "100px", maxWidth: "300px"}}>
                    {props.client.id}
                </div>
                <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "200px", maxWidth: "400px"}}>
                    {props.client.name}
                </div>
                <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "200px", maxWidth: "400px"}}>
                    {props.client.phoneNumber}
                </div>
                <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "200px", maxWidth: "400px"}}>
                    {props.client.clientCity}
                </div>
                <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "200px", maxWidth: "400px"}}>
                    {props.client.responsiblePerson}
                </div>
                <div className="col-md-3 col-sm-3 col-lg-3 col-xs-3 col-xl-3 row imgButtons" style={{minWidth: "50px"}}>
                    <div onClick={RefreshClick} style={{minWidth: "50px", maxWidth: "50px"}}>
                        <img className="headerButtons" src={refreshIcon}></img>
                    </div>
                    <div onClick={handleAddShow} style={{minWidth: "50px", maxWidth: "50px"}}>
                        <img className="headerButtons" src={addIcon}></img>
                    </div>
                    <Modal show={utils.showHideAddModal} onHide={handleAddClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Add new client</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ModalViewNewClient props={props.client}></ModalViewNewClient>
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
                <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "100px", maxWidth: "300px"}}>
                    {props.client.id}
                </div>
                <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "200px", maxWidth: "400px"}}>
                    {props.client.name}
                </div>
                <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "200px", maxWidth: "400px"}}>
                    {props.client.phoneNumber}
                </div>
                <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "200px", maxWidth: "400px"}}>
                    {props.client.clientCity}
                </div>
                <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "200px", maxWidth: "400px"}}>
                    {props.client.responsiblePerson}
                </div>
                <div className="col-md-3 col-sm-3 col-lg-3 col-xs-3 col-xl-3 row imgButtons">
                    <div onClick={handleReportShow} style={{minWidth: "50px", maxWidth: "50px"}}>
                        <img className="rowButtons" src={reportIcon}></img>
                    </div>
                    <Modal id={"reportModalClient" + props.client.id} show={props.client.showHideReportValue} onHide={handleReportClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Income for Client #{props.client.id} - {props.client.name}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ReportModalView props={props.client}></ReportModalView>
                            </Modal.Body>
                    </Modal>
                    <div onClick={handleEditShow} style={{minWidth: "50px", maxWidth: "50px"}}>
                        <img className="rowButtons" src={editIcon}></img>
                    </div>
                    <Modal id={"editModalClient" + props.client.id} show={props.client.showHideValue} onHide={handleEditClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Edit Client #{props.client.id} - {props.client.name}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ModalViewClients props={props.client}></ModalViewClients>
                            </Modal.Body>
                    </Modal>
                    <div onClick={DeleteClick} style={{minWidth: "50px", maxWidth: "50px"}}>
                        <img className="rowButtons" src={deleteIcon}></img>
                    </div>
                    <Modal show={deleteMessage} onHide={handleCloseErrorMessage}>
                            <Modal.Header closeButton>
                            <Modal.Title>Delete Client #{props.client.id} - {props.client.name}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                    {errorMessageOnClientDelete}
                                </div>
                            </Modal.Body>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default ClientRow;