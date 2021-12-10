import React, { useState } from 'react'
import {Form, Button} from 'semantic-ui-react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../../gql/user';
import { decodeToken, setToken } from '../../../utils/token';
import useAuth from '../../../hooks/useAuth';

export default function LoginForm (){

    const [Login] = useMutation(LOGIN);
    const [error, setError] = useState('');

    const {setUser} = useAuth();

    const formik = useFormik({
        initialValues:initialValues(),
        validationSchema: Yup.object({
            email:Yup.string().email('El email no es valido').required('el email es requerido'),
            password:Yup.string().required('La contraseña es obligatoria')
        }),
        onSubmit: async (formData)=>{
            setError('')
            try {
                const result = await Login({
                    variables:{
                        input:formData
                    }
                });
                setToken(result.data.login.token);
                setUser( decodeToken(result.data.login.token));//Actualiza el usuario con useState
            } catch (error) {
                setError(error.message);
                console.log(error);
            }
        }
    });

    return (
        <Form className="login-form" onClick={formik.handleSubmit}>
            <h2>
                Entra para ver fotos y videos de tus amigos.
            </h2>
            <Form.Input type="text" placeholder="Correo electronico" name="email" value={formik.values.email} onChange={formik.handleChange} error={formik.errors.email && true} /> 
            <Form.Input type="password" placeholder="Contraseña" name="password" value={formik.values.password} onChange={formik.handleChange} error={formik.errors.password && true} /> 
            <Button type="submit" className="btn-submit">Iniciar Sesion</Button>
            {error && <p className="submit-error">{error}</p>}
        </Form>
    )
}

function initialValues(){
    return{
        email:"",
        password:""
    }
}