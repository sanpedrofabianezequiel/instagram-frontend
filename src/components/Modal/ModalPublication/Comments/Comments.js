import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import {GET_COMMENTS} from '../../../../gql/comment';
import './Comments.scss';
import {Image} from 'semantic-ui-react';
import {map} from 'lodash';
import ImageNotFound from '../../../../assets/png/avatar.png';
import {Link}from 'react-router-dom';

export default function Comments ({publication}){
    console.log(publication);
    const {data,loading,startPolling,stopPolling} = useQuery(GET_COMMENTS,{
        variables:{
            input:publication.id
        }
    });

    useEffect(() => {
      startPolling(1000);
      return () => {
        stopPolling();
      };
    }, [startPolling,stopPolling]);
    
    if(loading) return null;
    const {getComments} = data;
    //console.log(data);

    return(
        <div className='comments'>
        {
            map(getComments,(item,index)=>(
                <Link key={index} to={`/${item.idUser.userName}`} className='comment' >
                    <Image src={item.idUser.avatar || ImageNotFound} avatar />
                    <div>
                        <p>{item.idUser.userName}</p>
                        <p>{item.comment}</p>
                    </div>
                </Link>
            ))
        }
        </div>
    )
}