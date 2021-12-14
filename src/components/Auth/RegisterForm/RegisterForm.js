import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { Form,Button } from 'semantic-ui-react';
import './RegisterForm.scss';


import {useMutation} from '@apollo/client';
import {REGISTER} from '../../../gql/user';
import { toast } from 'react-toastify';

export default function RegisterForm  (props) {
    const {setShowLogin} = props;
    //We need use de same nadme Function Mutation inside the array;
    const [register] = useMutation(REGISTER);    


    const formik = useFormik({
        initialValues:initialValues(),
        validationSchema:Yup.object({
            name:Yup.string().required('Tu nombre es obligatorio'),
            username:Yup.string().matches(/^[a-zA-Z0-9-]*$/,'EL nombre de usuario no puede tener espacio'),
            email:Yup.string().email('EL email no es valido').required('El email es obligatorio'),
            password:Yup.string().required('La contraseña es obligatorio').oneOf([Yup.ref('repeatPassword')],'Las contraseñas no son iguales'),
            repeatPassword:Yup.string().required('La contraseña es obligatoria').oneOf([Yup.ref('password')],'Las contraseñas no son iguales')
        }),
        onSubmit: async (values)=>{
            try {

                const newUser = values;
                delete newUser.repeatPassword;

                await register({
                    variables:{
                        input: {
                          email: newUser.email,
                          password: newUser.password,
                          userName:  newUser.username,
                          name: newUser.name
                        }
                      }
                })
                toast.success('Registacion exitosa');
                setShowLogin(true);
            } catch (error) {
                toast.error(error.message);
                console.log(error);
            }
        }
    })
    return (
        <>
            <h2 className="register-form-title">
                Registrate para ver fotos y videos de tus amigos.
            </h2>
            <Form className="register-form" onSubmit={formik.handleSubmit}>
                <Form.Input type="text" placeholder="Nombre y apellido" name="name" values={formik.values.name} onChange={formik.handleChange} error={formik.errors.name && true} />
                <Form.Input type="text" placeholder="Nombre de usuario" name="username" values={formik.values.username} onChange={formik.handleChange} error={formik.errors.username && true}  />
                <Form.Input type="text" placeholder="Correo electronico" name="email" values={formik.values.email} onChange={formik.handleChange} error={formik.errors.email && true}  />
                <Form.Input type="password" placeholder="Contraseña" name="password" values={formik.values.password} onChange={formik.handleChange} error={formik.errors.password && true}  />
                <Form.Input type="password" placeholder="Repetir contraseña" name="repeatPassword" values={formik.values.repeatPassword} onChange={formik.handleChange} error={formik.errors.repeatPassword && true}  />
                <Button type="submit" className="btn-submit">Registrarse</Button>
            </Form>
        </>
    )
}

function initialValues(){
    return{
        name:"",
        username:"",
        email:"",
        password:"",
        repeatPassword:"",

    }
}