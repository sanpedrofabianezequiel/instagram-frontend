import React,{useState,useEffect} from "react";
import './Feed.scss';
import {Image} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { GET_PUBLICTIONS_FOLLOWEDS } from "../../../gql/publication";
import ImageNotFound from '../../../assets/png/avatar.png';
import {map} from 'lodash';
import  Action from '../../Modal/ModalPublication/Actions';
import CommentForm from '../../Modal/ModalPublication/CommentForm';
import ModalPublication from '../../Modal/ModalPublication';

export default function Feed(){
    const [showModal,setShowModal] = useState(false);
    const [publicationSelect, setPublicationSelect] = useState(null);


    const {data,loading,startPolling,stopPolling} =useQuery(GET_PUBLICTIONS_FOLLOWEDS);

    useEffect(() => {
      startPolling(1000);
      return () => {
        stopPolling();
      };
    }, [startPolling,stopPolling]);
    


    if(loading) return null;
    console.log(data);
    const {getPublicationsFolloweds} =data;


    const openPublication = (publication) =>{
        setPublicationSelect(publication);
        setShowModal(true);
    }

    return(
        <>
        
            <div className="feed">
                {
                    map(getPublicationsFolloweds,(item,index) =>(
                        <div key={index} className="feed__box">
                            <Link to={`${item.idUser.userName}`}>
                                <div className="feed__box-user">
                                    <Image src={item.idUser.avatar || ImageNotFound} avatar />
                                    <span>{item.idUser.name}</span>
                                </div>
                            </Link>

                            <div className="feed__box-photo" style={{ backgroundImage:`url('${item.file}')`}} onClick={()=>openPublication(item)} />

                            <div className="feed__box-actions">
                                <Action  publication={item}/>
                            </div>

                            <div className="feed__box-form">
                                <CommentForm publication={item} />
                            </div>
                        </div>
                    )) 
                }
            </div>

            {
                showModal && (
                    <ModalPublication show={showModal} setShowModal={setShowModal} publication={publicationSelect} />
                )
            }
        </>
      );
}