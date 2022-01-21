import React from 'react';
import {size,map} from 'lodash';
import './ListUsers.scss';
import {Image} from 'semantic-ui-react';
import ImageNotFound from '../../../assets/png/avatar.png'
import {useNavigate } from  'react-router-dom';



export default function ListUsers(props){
    const {users,setShowModal} = props;

   // const history = useNavigate();

    const goToUser = (input)=>{
        setShowModal(false);
        //history(`/${input}`);
        this.props.history.push(`/${input}`)
    }

    return(
        <div className='list-users'>
            {
                size(users)=== 0 
                ? ( <p className='list-users__not-users' >No se han encontrado usuarios</p>)
                : (
                    map(users,(item,index)=>{
                        <div key={index} className='list-users__user' onClick={()=>goToUser(item.userName)} >
                            <Image src={item.avatar || ImageNotFound } avatar  />
                            <div>
                                <p>{item.name}</p>
                                <p>{item.userName}</p>
                            </div>
                        </div>
                    })
                )
            }
        </div>
    )

}