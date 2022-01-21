import React from 'react';
import './ModalUpload.scss';
import {Modal,Icon,Button,Dimmer,Loader} from 'semantic-ui-react';


export default function ModalUpload(props){

    const {show,setShow} = props;

    const onClose = ()=>{

        setShow(false);
    };

    return(
         <Modal size="small" open={show} onClose={onClose} className='modal-upload' >
             <h1>Esto es el Modal Upload</h1>
         </Modal>
    );
}