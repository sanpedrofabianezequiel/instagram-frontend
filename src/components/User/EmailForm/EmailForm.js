import React from 'react';
import {Form,Button} from 'semantic-ui-react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import './EmailForm.scss';
import {useMutation} from '@apollo/client';
import {UPDATE_USER} from '../../../gql/user';
import {toast} from 'react-toastify';

export default function EmailForm(props){
    const {setShowModal,currentEmail,refetch} = props;
    const [updateUser]  = useMutation(UPDATE_USER);

    const formik = useFormik({
        initialValues:{
            email:currentEmail | ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required()
        }),
        onSubmit: async(event)=>{
            try {
                await updateUser({
                    variables:{
                        input:{
                            email:event.email
                        }
                    }
                })
                refetch();//Realiza un query al backend, ganamos velocidad de escritura pero perdemos performance
                setShowModal(false);
                toast.success('Email cambiado con exito!');
            } catch (error) {
                toast.error('Error al cambiar el email')
                console.log('Error al cambiar el email')
            }
        }
    })


    return (
        <Form className='email-form' onSubmit={formik.handleSubmit} > 
            <Form.Input placeholder="Escribe tu nuevo email" name='email' onChange={formik.handleChange} value={formik.values.email} error={formik.errors.email && true} />
            <Button type="submit" className='btn-submit'>Actualizar</Button>
        </Form>
    )
}