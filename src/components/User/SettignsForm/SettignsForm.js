import React from 'react';
import { Button } from 'semantic-ui-react';
import { egate } from 'react-router-dom';
import {useApolloClient} from '@apollo/client';
import './SettignsForm.scss';
import useAuth from '../../../hooks/useAuth';
import PasswordForm from '../PasswordForm';
import EmailForm from '../EmailForm';
import DescriptionForm from '../DescriptionForm';
import SiteWebForm from '../SiteWebForm';

export default function SettignsForm(props){
    const {setShowModal,setTitleModal,setChildrenModal,getUser,refetch} = props;
    const {logout} = useAuth();
    //const history  = useNavigate();
    const client   = useApolloClient();

    console.log(getUser);
    const onLogout= ()=>{
        logout();
       // history('/')
       
        document.location.href = ('/');
        //clear chache apollo
        client.clearStore();
    }


    const onChangePassword = ()=>{
        setTitleModal('Cambiar contraseña');
        setChildrenModal(<PasswordForm onLogout={onLogout} />)
    }

    const onChangeEmail = ()=>{
        setTitleModal('Cambiar email');
        setChildrenModal(<EmailForm setShowModal={setShowModal} currentEmail={getUser.email} refetch={refetch} />)
    }

    const onChangeDescription = ()=>{
        setTitleModal('Actualizar tu biografia');
        setChildrenModal(<DescriptionForm setShowModal={setShowModal} currentDescription={getUser.description} refetch={refetch} />)
    }
    
    const onChangeSiteWeb = ()=>{
        setTitleModal('Actualizar tu Sitio Web');
        setChildrenModal(<SiteWebForm setShowModal={setShowModal} currentSiteWeb={getUser.siteWeb} refetch={refetch} />)
    }


    return (
        <div className="settigns-form"> 
            <Button onClick={onChangePassword}>Cambiar contraseña</Button>
            <Button onClick={onChangeEmail}>Cambiar email</Button>
            <Button onClick={onChangeDescription}>Descripcion</Button>
            <Button onClick={onChangeSiteWeb}>Sitio web</Button>
            <Button onClick={onLogout}>Cerrar sesiòn</Button>
            <Button onClick={()=>setShowModal(false)}>Cancelar</Button>
        </div>
    )
}