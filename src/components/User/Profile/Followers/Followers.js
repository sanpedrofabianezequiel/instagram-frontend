import React,{useEffect} from 'react';
import './Followers.scss';
import { useQuery } from '@apollo/client';
import {GET_FOLLOWERS} from '../../../../gql/follow';
import  {size} from 'lodash';

export default function Followers(props){
    const {username} = props;

    const {data:dataFollowers,loading:loadingFollowers,startPolling:startPollingFollowers,stopPolling:stopPollingFollowers} = useQuery(GET_FOLLOWERS,{
        variables:{
            input:username
        }
    });

    if(loadingFollowers) return null;
    const {getFollowers} = dataFollowers;


    //Real time, sobrecargando el servidor
    useEffect(() => {
        startPollingFollowers(1000);//cada 1 segundo realizamos una peticion
        return () => {
            //Desmont
            stopPollingFollowers();
        }
    }, [input])

    return(
        <div className='followers'>
            <p><span></span></p>
            <p className='link'><span>{size(getFollowers)}</span></p>
            <p className='link'><span></span></p>
        </div>
    )
}