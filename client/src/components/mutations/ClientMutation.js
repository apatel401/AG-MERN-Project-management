import { gql } from '@apollo/client';

export const DELETE_CLIENT = gql`
mutation deleteClient($id: ID!){
    deleteClient($id: ID!){
        id
        name
        email
        phone
    }
}
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;
