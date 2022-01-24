import React,{useState} from 'react';
import './Profile.scss';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../../gql/user';
import ImageNoFound from '../../../assets/png/avatar.png';
import {Grid, Image} from 'semantic-ui-react'
import UserNotFound from '../../UserNotFound';
import ModalBasic from '../../Modal/ModalBasic';
import AvatarForm from '../AvatarForm';
import userAuth from '../../../hooks/useAuth';
import HeaderProfile from './HeaderProfile';
import SettignsForm from '../SettignsForm';
import Followers from './Followers';

export default function Profile ({username,totalPublications}){
    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState("");
    const [childrenModal, setChildrenModal] = useState(null);
    const {auth} = userAuth();



    const {data,loading,error,refetch} =  useQuery(GET_USER,{
        variables:{
            username: username
        }
    });
    if(loading) return null;
    if(error) return <UserNotFound/>
    
    const {getUser} = data;


    const handleModal = (type)=>{
        switch (type) {
            case 'avatar':
                setTitleModal('Cambiar foto de perfil');
                setChildrenModal(<AvatarForm setShowModal = {setShowModal}  auth ={ auth} />);
                setShowModal(true); 
                break;
        
            case 'settigns':
                setTitleModal('');
                setChildrenModal(<SettignsForm setShowModal={setShowModal} setTitleModal={setTitleModal} setChildrenModal={setChildrenModal} getUser={getUser} refetch={refetch} />);
                setShowModal(true); 
                break;    
            default:
                break;
        }
    }
    
    if(!getUser) return (<p>Perfil de usuario no encontrado</p>);
    //console.log(getUser.avatar);
    return (
        <>
            <Grid className='profile'>
                <Grid.Column width={5} className='profile__left'>
                    <Image src ={
                        getUser.avatar ? getUser.avatar : ImageNoFound } avatar onClick={()=> username === auth.userName && handleModal('avatar')} /> 
                </Grid.Column>

                <Grid.Column width={5} className='profile__right'>
                    <HeaderProfile username={username} getUser={getUser} auth={auth} handleModal={handleModal} />
                    <Followers   username={username} totalPublications={totalPublications}/>
                    <div className='other'>
                        <p className='name'>{  getUser.name }</p>
                        {
                            getUser.siteWeb && (
                                <p className='description' >{getUser.description}</p>
                            )
                          
                        }
                        {
                              (<p className='description' >{getUser.description}</p>)
                        }
                    </div>
                </Grid.Column>
            </Grid>   
            <ModalBasic  show={showModal} setShow={setShowModal} title={titleModal} >
               {childrenModal}
            </ModalBasic>
        </>
    )
}
