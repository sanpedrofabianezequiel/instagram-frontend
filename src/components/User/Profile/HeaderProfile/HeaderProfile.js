import React from 'react';
import {Button} from 'semantic-ui-react'

export default function HeaderProfile(props){
    const {getUser ,auth,handleModal} = props;
    
    return(
        <div className='header_profile'>
            <h2>{getUser.userName}</h2>
            {
                getUser.userName === auth.userName
                ? (<Button onClick={()=>handleModal('settigns')} >Ajustes</Button>)
                : (<Button>Seguir</Button>)
            }
        </div>
    )
}