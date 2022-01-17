import React,{useState,useEffect} from 'react';
import './Followers.scss';
import { useQuery } from '@apollo/client';
import {GET_FOLLOWERS,GET_FOLLOWEDS} from '../../../../gql/follow';
import  {size} from 'lodash';
import ModalBasic from '../../../Modal/ModalBasic';
import ListUsers from '../../ListUsers';

export default function Followers(props){
    const {username} = props;
    const [showModal,setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [childrenModal, setChildrenModal] = useState(null);


    const {data:dataFollowers,loading:loadingFollowers,startPolling:startPollingFollowers,stopPolling:stopPollingFollowers} = useQuery(GET_FOLLOWERS,{
        variables:{
            input:username
        }
    });

    
    const {data:dataFolloweds,loading:loadingFolloweds,startPolling:startPollingFollowed,stopPolling:stopPollingFolloweds} = useQuery(GET_FOLLOWEDS,{
        variables:{
            input:username
        }
    })    

    if(loadingFollowers || loadingFolloweds) return null;
    const {getFollowers} = dataFollowers;
    const {getFolloweds} = dataFolloweds; 

    //Real time, sobrecargando el servidor
    useEffect(() => {
        startPollingFollowers(1000);//cada 1 segundo realizamos una peticion
        return () => {
            //Desmont
            stopPollingFollowers();
        }
    }, [startPollingFollowers, stopPollingFollowers])


    
    //Real time, sobrecargando el servidor
    useEffect(() => {
        startPollingFollowed(1000);//cada 1 segundo realizamos una peticion
        return () => {
            //Desmont
            stopPollingFolloweds();
        }
    }, [startPollingFollowed, stopPollingFolloweds ])



    const openFollowers = ()=>{
        setTitleModal('Seguidores');
        setChildrenModal(<ListUsers users={getFollowers}  setShowModal={setShowModal} />);
        setShowModal(true);
    };


    const openFolloweds = ()=>{
        setTitleModal('Usuarios seguidos');
        setChildrenModal(<ListUsers users={getFolloweds}  setShowModal={setShowModal} />);
        setShowModal(true);
    };

    return(
        <>
            <div className='followers'>
                <p><span></span></p>
                <p className='link' onClick={openFollowers}><span>{size(getFollowers)}</span></p>
                <p className='link' onClick={openFolloweds}><span>{size(getFolloweds)}</span></p>
            </div>
            <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
                {childrenModal}
            </ModalBasic>
        </>
        
    )
}