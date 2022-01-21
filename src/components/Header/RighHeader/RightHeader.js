import React, { useState } from 'react';
import './RightHeader.scss';
import {Link} from 'react-router-dom';
import {Icon, Image} from 'semantic-ui-react';
import {useQuery} from '@apollo/client';
import {GET_USER} from '../../../gql/user';
import useAuth from '../../../hooks/useAuth';
import ImageNoFound from '../../../assets/png/avatar.png';
import ModalUpload from '../../Modal/ModalUpload';  



export default function RightHeader (){
    const [showModal, setShowModal] = useState(false);
    const {auth} =  useAuth();
    const {data,loading,error} = useQuery(GET_USER,{
        variables:{
            username:auth.userName
        }
    });

    if(loading || error ) return null;
    const {getUser} = data;
    //console.log(auth);
    return (
        <>
          <div className="right-header">
              <Link to="/">
                  <Icon name="home"/>
              </Link>
              <Icon name="plus" onClick={()=> setShowModal(true)} />
              <Link to={`/${auth.userName}`}>
                <Image src={getUser.avatar ? getUser.avatar : ImageNoFound} avatar />
              </Link>
          </div>
          <ModalUpload show={showModal} setShow = {setShowModal}/>
        </>
            
    )
}
