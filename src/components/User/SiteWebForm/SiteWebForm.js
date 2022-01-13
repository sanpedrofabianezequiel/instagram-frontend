import React from 'react'
;import {Form,Button} from 'semantic-ui-react';
import {toast} from 'react-toastify';
import './SiteWebForm.scss';
import {useMutation} from '@apollo/client';
import {UPDATE_USER} from '../../../gql/user';
import * as Yup from 'yup';
import {useFormik } from 'formik'


export default function SiteWebForm(props){
    const {setShowModal,currentSiteWeb,refetch} = props;

    const [updateUser] = useMutation(UPDATE_USER);

    const formik =  useFormik({
        initialValues:{
            siteWeb:currentSiteWeb || ''
        },
        validationSchema:Yup.object({
            siteWeb: Yup.string().required()
        }),
        onSubmit:async(event)=>{
            
            try {
                await updateUser({
                    variables:{
                        input:{
                            siteWeb:event.siteWeb 
                        }
                    }
                })      

                refetch();
                setShowModal(false);
                toast.success('Site web cambiado con exito');
            } catch (error) {
                console.log(error);
                toast.error('Error al actulizar el sitio web')
            }
        }
    })

    return(
        <Form className='site-web-form' onSubmit={formik.handleSubmit}>
            <Form.Input placeholder="URL web" name='siteWeb'  value={formik.values.siteWeb} onChange={formik.handleChange} error={formik.errors.siteWeb && true} />
            <Button type="submit" className='btn-submit'>
                Actualizar
            </Button>
        </Form>
    )
}
