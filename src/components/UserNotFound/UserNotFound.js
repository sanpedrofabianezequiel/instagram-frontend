import React from 'react'
import {Link} from 'react-router-dom';
import './UserNotFound.scss';

export default function UserNotFound (){


    return (
        <div className='user-not-found'>
            <p>Usuario no encontrado</p>
            <p>
                Es posibl que el enlace que has seguido sea incorrecto o el usuario se haya eliminado
            </p>
            <Link to="/" > Volver a la home </Link>
        </div>
    )
}
