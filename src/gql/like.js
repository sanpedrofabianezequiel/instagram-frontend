import { gql } from "@apollo/client";



export const ADD_LIKE = gql`
    mutation addLike($input: ID!){
        addLike(input: $input)
    }
`;

export const IS_LIKE= gql`
    query isLike($input: ID!){
        isLike(input: $input)
    }
`; 


export const DELETE_LIKE = gql`
    mutation deleteLike($input : ID!){
        deleteLike(input : $input)
    }
`;

export const COUNT_LIKE =gql`
    query countLikes($input : ID!){
        countLikes(input : $input)
    }
`;