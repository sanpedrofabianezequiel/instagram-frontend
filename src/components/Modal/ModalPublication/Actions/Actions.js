import React,{useState}from 'react';
import {Icon} from 'semantic-ui-react'
import './Actions.scss';
import { useMutation,useQuery } from '@apollo/client';
import {ADD_LIKE,IS_LIKE,DELETE_LIKE,COUNT_LIKE} from '../../../../gql/like';

export default function Actions ({publication}) {
    const [loadingAction, setLoadingAction] = useState(false);
    const [addLike] = useMutation(ADD_LIKE);
    const [deleteLike] =useMutation(DELETE_LIKE);
    const {data,loading,refetch} =  useQuery(IS_LIKE,{
        variables:{
            input:publication.id
        }
    })

    const {data:dataCount,loading:loadingCount,refetch:refetchCount} = useQuery(COUNT_LIKE,{
        variables:{
            input:publication.id
        }
    });

    const onDeleteLike =async()=>{
        setLoadingAction(true);
        try {
            await deleteLike({
                variables:{
                    input:publication.id
                }
            })
            refetch();
            refetchCount();
        } catch (error) {
            console.log(error);
        }
        setLoadingAction(false);
    }

    const onAddLike = async()=>{
        setLoadingAction(true);
        try {
            await addLike({
                variables:{
                    input:publication.id
                }
            });
            refetch();
            refetchCount();
        } catch (error) {
            console.log(error);
        }
        setLoadingAction(false);
    }

    const onAction =()=>{
        if(!loadingAction){//Si no esta ejecutando ninguna accion entonce permito hacer
            if(isLike){
                onDeleteLike();
            }else{
                onAddLike();
            }
        }
    }

    if(loading || loadingCount) return null;
    const{isLike } = data;
    const {countLikes} = dataCount;
   

  
    return(
         <div className='actions'>
             <Icon className={isLike ? 'like active': 'like'} name={isLike ? 'heart':'heart outline'} onClick={onAction} />
             {countLikes} {countLikes === 1 ? 'Like': 'Likes'}
         </div>
    );
}