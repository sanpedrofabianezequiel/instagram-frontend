import React from 'react';
import {Button} from 'semantic-ui-react'
import { useQuery,useMutation } from '@apollo/client';
import { IS_FOLLOW ,FOLLOW,UN_FOLLOW} from '../../../../gql/follow';



export default function HeaderProfile(props){
    const {getUser ,auth,handleModal} = props;
    const [follow] = useMutation(FOLLOW);
    const [unFollow] = useMutation(UN_FOLLOW);
    const {data,loading,error,refetch} = useQuery(IS_FOLLOW,{
        variables:{
            input:getUser.userName
        }
    });
    
    //console.log(data);
    const buttonFollow = ()=>{
        if(data.isFollow){
            return <Button className='btn-danger' onClick={onUnFollow}>Dejar de seguir</Button>
        }else{
            return <Button className='btn-action' onClick={onFollow} >Seguir</Button>
        }
    }
    
    const onFollow = async()=>{
        try {
            await follow({
                variables:{
                    username:getUser.userName
                }
            });

            refetch();
        } catch (error) {
            console.log(error);
        }
    }


    const onUnFollow = async()=>{
        try {
            await unFollow({
                variables:{
                    input: getUser.userName
                }
            })
            
            refetch();
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className='header_profile'>
            <h2>{getUser.userName}</h2>
            {
                /*!loading if we stoped the search inforamtion, we going to render Component */
                getUser.userName === auth.userName
                ? (<Button onClick={()=>handleModal('settigns')} >Ajustes</Button>)
                : (
                    !loading && buttonFollow()
                )
            }
        </div>
    )
}