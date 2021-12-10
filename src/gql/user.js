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