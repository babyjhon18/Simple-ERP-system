import { useSelector } from "react-redux";
import ClientForm from "../ClientsForm/ClientsForm";
import LoginMenu from "../LoginMenu/LoginMenu";
import DataBaseForm from "../DataBaseForm/DataBaseForm";

function MainPage(){

    const login = useSelector(state => state.loginReduser);

    if(login.isLoggedIn){
        if(login.managerNumber == 1)
            return <ClientForm></ClientForm>
        else if(login.managerNumber == 2){
            return <DataBaseForm></DataBaseForm>
        }
        else{
            return <LoginMenu></LoginMenu>
        }
    }
    return <LoginMenu></LoginMenu>
}

export default MainPage;