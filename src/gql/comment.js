import {gql} from '@apollo/client';

export const ADD_COMMENT= gql`
    mutation addComment($input: CommentInput!){
        addComment(input: $input){
            idPublication,
            comment
        }
    }
`;

export const GET_COMMENTS =gql`
    query getComments($input: ID!){
        getComments(input: $input){
            comment,
            idUser{
                name,
                userName,
                avatar
            }
        }
    }
`;