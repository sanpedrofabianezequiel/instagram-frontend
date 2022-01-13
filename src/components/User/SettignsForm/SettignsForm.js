import React from 'react';
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import {useApolloClient} from '@apollo/client';
import './SettignsForm.scss';
import useAuth from '../../../hooks/useAuth';
import PasswordForm from '../PasswordForm';

export default function SettignsForm(props){
    const {setShowModal,setTitleModal,setChildrenModal} = props;
    const {logout} = useAuth();
    const history  = useHistory();
    const client   = useApolloClient();


    const onLogout= ()=>{
        logout();
        history.push('/')
        //clear chache apollo
        client.clearStore();
    }


    const onChangePassword = ()=>{
        setTitleModal('Cambiar contraseña');
        setChildrenModal(<PasswordForm onLogout={onLogout} />)
    }

    return (
        <div className="settigns-form"> 
            <Button onClick={onChangePassword}>Cambiar contraseña</Button>
            <Button>Cambiar email</Button>
            <Button>Descripcion</Button>
            <Button>Sitio web</Button>
            <Button onClick={onLogout}>Cerrar sesiòn</Button>
            <Button onClick={()=>setShowModal(false)}>Cancelar</Button>
        </div>
    )
}