import React from 'react';
import './UsersNotFolloweds.scss';
import {Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import {map}from 'lodash';
import {useQuery} from '@apollo/client';
import {GET_NOT_FOLLOWEDS} from '../../../gql/follow';
import  ImageNotFound from '../../../assets/png/avatar.png';
 
export default function UsersNotFolloweds (){
    const {data,loading} = useQuery(GET_NOT_FOLLOWEDS);

    if(loading) return null;
    const {getNotFolloweds} = data;
    console.log(getNotFolloweds);

    return(
        <div className='users-not-followeds'>
            <h3>Usuarios que no sigues</h3>
            {
                map(getNotFolloweds,(item,index)=>(
                    <Link key={index} to={`/${item.userName}`} className='users-not-followeds__user' >
                        <Image src={item.avatar || ImageNotFound} avatar />
                        <span>{item.name}</span>
                    </Link>
                ))
            }
        </div>
    );
}