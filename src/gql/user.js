import {gql} from '@apollo/client';

export const REGISTER = gql `
    mutation Register($input: UserInput) {
        register(input: $input) {
        id
        name
        userName
        email
        createAt
        }
    }
`;  

export const LOGIN = gql `
    mutation Login($input: LoginInput) {
        login(input: $input) {
        token
        }
    }
`;  

export const GET_USER = gql`
    query Query($username: String) {
        getUser(username: $username) {
        name
        userName
        email
        siteWeb
        avatar
        createAt
        }
    }
`;

export const UPDATE_AVATAR = gql`
    mutation updateAvatar($file: Upload!){
        updateAvatar(file: $file){
            status
            urlAvatar
        }
    }
`;

export const DELETE_AVATAR = gql`
    mutation deleteAvatar{
        deleteAvatar
    }
`;

export const UPDATE_USER = gql`
    mutation updateUser($input : UserUpdateInput){
        updateUser(input: $input)
    }
`;