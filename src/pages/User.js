import React, { useEffect } from 'react'
import Profile from '../components/User/Profile';
import { useQuery } from '@apollo/client';
import {GET_PUBLICATIONS} from '../gql/publication'; 
import {size} from 'lodash';
import Publications from '../components/Publications';


export default function User({match}){
    const {params} = match;
   
    const {data,loading,startPolling,stopPolling} =  useQuery(GET_PUBLICATIONS,{
        variables:{
            input:params.username
        }
    })

    useEffect(() => {
      startPolling(1000);    
      return () => {
        stopPolling();
      };
    }, [startPolling,stopPolling]);
    



    if(loading) return null;
    const {getPublications} = data;

    return (
        <>
            <Profile username={params.username} totalPublications = {size(getPublications)} />
            <Publications getPublications={getPublications} />
        </>
    )
}
