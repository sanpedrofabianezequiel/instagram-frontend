import React, { useState,useEffect } from 'react';
import {Search as SearchSu,Image}  from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import './Search.scss';
import { useQuery } from '@apollo/client';
import {SEARCH} from '../../../gql/user';
import {size} from 'lodash';
import ImageNotFound from '../../../assets/png/avatar.png';

export default function Search(){  
    const [search, setSearch] = useState(null);
    const [results, setResults] = useState([])
    const {data,loading,error,refetch} = useQuery(SEARCH,{
        variables:{
            input:search
        }
    })
    useEffect(() => {
        if(size(data?.search) > 0){
            const users = [];
         
            data.search.forEach((item,index) => {
                
                users.push({
                    key:index,
                    title:item.name,
                    username:item.userName,
                    avatar:item.avatar
                });
            });
            setResults(users);
        }else {
            setResults([]);
        }
    }, [data])

    const onChange = (e) =>{
        if(e.target.value) setSearch(e.target.value);
        else setSearch(null); 
    }


    //Limpiamos el search luego de que eleige una opcion
    const handleResultSelect = ()=>{
        setSearch(null);
        setResults([]);
    }

    return(
        <SearchSu 
        loading={loading} 
        value={search || ''}
        onSearchChange={onChange}
        results={results}
        resultRenderer={(e)=> <ResultSearch data={e} />}
        onResultSelect={handleResultSelect}
        className='search-users' fluid input={{icon:'search', iconPosition:'left'}}  />
    )
}


function ResultSearch(props){
    const {data} = props;

    return(
        <Link className='search-users__item' to={`/${data.username}`} >
            <Image src={data.avatar || ImageNotFound} />
            <div>
                <p>{data.title}</p>
                <p>{data.username}</p>
            </div>
        </Link>
    )
}