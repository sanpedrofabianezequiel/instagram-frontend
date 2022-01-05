import React from 'react';
import './RightHeader.scss';
import {Link} from 'react-router-dom';
import {Icon, Image} from 'semantic-ui-react';
import {useQuery} from '@apollo/client';
import {GET_USER} from '../../../gql/user';
import useAuth from '../../../hooks/useAuth';
import ImageNoFound from '../../../assets/png/avatar.png';



export default function RightHeader (){
    const {auth} =  useAuth();
    const {data,loading,error} = useQuery(GET_USER,{
        variables:{
            username:auth.userName
        }
    });

    if(loading || error ) return null;
    const {getUser} = data;
    console.log(auth);
    return (
          <div className="right-header">
              <Link to="/">
                  <Icon name="home"/>
              </Link>
              <Icon name="plus" />
              <Link to={`/${auth.userName}`}>
                <Image src={getUser.avatar ? getUser.avatar : ImageNoFound} avatar />
              </Link>
          </div>  
    )
}
