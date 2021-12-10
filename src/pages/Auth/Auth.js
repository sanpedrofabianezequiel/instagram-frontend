import React, {useState} from 'react'
import './Auth.scss';
import {Container,Image} from 'semantic-ui-react';
import instaclone from '../../assets/png/instaclone.png';
import RegisterForm from '../../components/Auth/RegisterForm';
import LoginForm from '../../components/Auth/LoginForm/LoginForm';


export default function Auth(){

    const [showLogin, setShowLogin] = useState(false);
    
    return (
        <Container fluid className="auth">
            <Image  src={instaclone} /> 

            <div className="container-form">
                {
                    showLogin
                    ? (<LoginForm>Formulario registro</LoginForm>)
                    : (<RegisterForm setShowLogin={setShowLogin} />)
                }
            </div>

            <div className="change-form">
            {
                showLogin
                ? (<>
                    No tienes cuenta?
                    <span onClick={()=>setShowLogin(!showLogin)}> Registrate</span>
                   </>)
                :(<>
                    Entrar con tu cuenta! 
                    <span onClick={()=>setShowLogin(!showLogin)}> Iniciar Sesion</span>
                   </>)
            }
            </div>
        </Container>
    )
}
