import React,{useCallback,useState} from 'react';
import './ModalUpload.scss';
import {Modal,Icon,Button,Dimmer,Loader} from 'semantic-ui-react';
import {useDropzone} from 'react-dropzone';
import {PUBLISH} from '../../../gql/publication';
import { useMutation } from '@apollo/client';
import {toast} from 'react-toastify';

export default function ModalUpload(props){

    const {show,setShow} = props; 
    const [fileUpload, setFileUpload] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [publish] = useMutation(PUBLISH);


    const onDrop =  useCallback((acceptedFile)=>{
        const file = acceptedFile[0];
        setFileUpload({
            type:'image',
            file:file,
            preview: URL.createObjectURL(file)
        })
    });

    const {getRootProps,getInputProps} =  useDropzone({
        accept:'image/jpeg, image/png',
        noKeyboard:true,
        multiple:false,
        onDrop:onDrop
    });

    const onClose = ()=>{
        setIsLoading(false);
        setFileUpload(null);
        setShow(false);
    };

    const onPublish=async()=>{
      
        try {
            const result = await publish({
                variables:{
                    input:fileUpload.file
                }
            });

            const {data} = result;

            if(!data.publish.status){
                toast.warning('Error en la publicacion');
                setIsLoading(false);
            }else{
                toast.success('Pulicacion completada');
                onClose();
            }

        } catch (error) {
            console.log(error);
        }
    }
    return(
         <Modal size="small" open={show} onClose={onClose} className='modal-upload' >
             <div {...getRootProps()} className='dropzone' style={fileUpload && {border:0}}>
                 {
                     !fileUpload && (
                        <>                                        
                          <Icon name ="cloud upload" />
                          <p>Arraste tu foto que quieras publicar</p>
                        </>
                     )
                 }
                <input {...getInputProps()} />
             </div>
                {/*Image*/}
                {
                    fileUpload?.type ==='image' && (
                        <div className='image' style={{backgroundImage:`url('${fileUpload.preview}')`}} />
                    )
                }
         
                {
                    fileUpload && (
                        <Button className='btn-upload btn-action' onClick={onPublish}>
                            Publicar
                        </Button>
                    )
                }

                {isLoading && (
                    <Dimmer active className="publishing">
                        <Loader />
                    </Dimmer>
                )}
                
         </Modal>
    );
}