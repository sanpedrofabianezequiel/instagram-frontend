import { ApolloClient,InMemoryCache,createHttpLink} from '@apollo/client';
//import { ApolloLink } from '@apollo/client/core';
import { createUploadLink } from "apollo-upload-client";
import { setContext} from 'apollo-link-context';
import {getToken} from '../utils/token';
/*
const httpLink = new  createHttpLink({
    uri:'http://localhost:4000/',
});*/
const uploadLink = createUploadLink({
    uri:'http://localhost:4000/graphql',
});


const authLink = setContext((_,{header})=>{
    const token= getToken();

    return {
        headers:{
            ...header,
            Authorization: token ? `Bearer ${token}`: ''
        }
    }
})

const client =  new ApolloClient({
    connectToDevTools:true,
    cache : new InMemoryCache(),
    link : authLink.concat(uploadLink)
});

export default client;