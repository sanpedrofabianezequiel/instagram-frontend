import React,{useState,useEffect} from 'react';
import './Followers.scss';
import { useQuery } from '@apollo/client';
import {GET_FOLLOWERS,GET_FOLLOWEDS} from '../../../../gql/follow';
import  {size} from 'lodash';
import ModalBasic from '../../../Modal/ModalBasic';
import ListUsers from '../../ListUsers';

export default function Followers(props){
    const {username,totalPublications} = props;
    const [showModal,setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [childrenModal, setChildrenModal] = useState(null);


    const {   data: dataFollowers,
        loading: loadingFollowers,
        startPolling: startPollingFollowers,
        stopPolling: stopPollingFollowers,} = useQuery(GET_FOLLOWERS,{
        variables:{
            input:username
        }
    });

    
    const { data: dataFolloweds,
        loading: loadingFolloweds,
        startPolling: startPollingFolloweds,
        stopPolling: stopPollingFolloweds,} = useQuery(GET_FOLLOWEDS,{
        variables:{
            input:username
        }
    })    

    //Real time, sobrecargando el servidor
    useEffect(() => {
        startPollingFollowers(1000);
        return () => {
          stopPollingFollowers();
        };
      }, [startPollingFollowers, stopPollingFollowers]);
    
      useEffect(() => {
        startPollingFolloweds(1000);
        return () => {
          stopPollingFolloweds();
        };
      }, [startPollingFolloweds, stopPollingFolloweds]);


    if(loadingFollowers || loadingFolloweds) return null;
    const {getFollowers} = dataFollowers;
    const {getFolloweds} = dataFolloweds; 
      //console.log(getFollowers,getFolloweds);
    



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
            <div className="followers">
                <p>
                    <span>{totalPublications}</span> Publicaciones
                </p>

                <p className="link" onClick={openFollowers}>
                    <span>{size(getFollowers)}</span> seguidores
                </p>
                <p className="link" onClick={openFolloweds}>
                    <span>{size(getFolloweds)}</span> seguidos
                </p>
            </div>
            <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
                {childrenModal}
            </ModalBasic>
        </>
        
    )
}