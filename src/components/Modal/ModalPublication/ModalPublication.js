import React from 'react';
import { Modal,Grid } from 'semantic-ui-react';
import './ModalPublication.scss';
import CommentForm from './CommentForm';
import Comments from './Comments';
import Actions from './Actions';

export default function ModalPublication({show,setShowModal,publication}){

    const onClose=()=>{
        setShowModal(false);
    } 

    return(
        <Modal open={show} onClose={onClose} className='modal-publication'>
            <Grid>
                <Grid.Column className='modal-publication__left' width={10} style={{backgroundImage: `url('${publication.file}')`}} />
                <Grid.Column className='modal-publication__right' width={6}>
                    
                    <Comments publication={publication} />
                    <Actions publication={publication} />
                    <CommentForm publication = {publication}/>

                </Grid.Column>
            </Grid>
        </Modal>
    )
}