import { gql } from "@apollo/client";

export const IS_FOLLOW = gql`
    query Query($input: String!) {
        isFollow(input: $input)
    } 
`;

export const FOLLOW =gql`
    mutation Follow($username: String!) {
        follow(username: $username)
    }
`;

export const UN_FOLLOW = gql`
    mutation Follow($username: String!) {
        follow(username: $username)
    }
`;


export const GET_FOLLOWERS = gql`
    query GetFollowers($input: String!) {
        getFollowers(input: $input) {
        userName
        name
        avatar
        }
    }
`;