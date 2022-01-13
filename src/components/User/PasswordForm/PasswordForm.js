import React from 'react';
import './PasswordForm.scss';
import {Form,Button} from 'semantic-ui-react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { initial } from 'lodash';
import {UPDATE_USER} from '../../../gql/user';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify'; 


export default function PasswordForm (props){
    const {onLogout} = props;

    const [updateUser] = useMutation(UPDATE_USER);


    const formik =  useFormik({
        initialValues:initialValues(),
        validationSchema: Yup.object({
            currentPassword : Yup.string().required(),
            newPassword: Yup.string().required().oneOf([Yup.ref('repeatNewPassword')]),
            repeatNewPassword:Yup.string().required().oneOf([Yup.ref('newPassword')])
        }),
        onSubmit:async(event) =>{
            try {   
                const result = await updateUser({
                    variables:{
                        input:{
                            currentPassword: event.currentPassword,
                            newPassword:event.newPassword
                        }
                    }
                })

                if(!result.data.updateUser){
                    toast.error('Error a cambiar la contraseña');
                }else{
                    toast.success('Contraseña cambiada con exito');
                    onLogout();
                }

            } catch (error) {
                console.log(error);
                toast.error('Error al cambiar la contraseña')
            }
        }
    })

    return (
        <Form className='password-form' onSubmit={formik.handleSubmit}>
            <Form.Input placeholder="Contraseña actual" name="currentPassword" type='password' value={formik.values.currentPassword} onChange={formik.handleChange} error={formik.errors.currentPassword && true} />
            <Form.Input placeholder="Nueva contraseña" name="newPassword" type='password' value={formik.values.newPassword} onChange={formik.handleChange} error={formik.errors.newPassword && true} />
            <Form.Input placeholder="Repetir nueva contraseña" name="repeatNewPassword" type='password' value={formik.values.repeatNewPassword} onChange={formik.handleChange} error={formik.errors.repeatNewPassword && true} />
            <Button type="submit" className='btn-submit'>Actualizar</Button>
        </Form>
    )
}

function initialValues(){
    return {
        currentPassword : '',
        newPassword:'',
        repeatNewPassword:''
    }
}