import  {gql} from '@apollo/client'

export const PUBLISH = gql`
    mutation publish($input: Upload!){
        publish(input: $input){
            status,
            urlFile
        }
    }
`;

export const GET_PUBLICATIONS =gql`
    query getPublications($input: String!){
        getPublications(input : $input){
            id,
            idUser,
            file,
            typeFile
        }
    }
`;