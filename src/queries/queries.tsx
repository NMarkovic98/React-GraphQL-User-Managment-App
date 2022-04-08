import { gql } from '@apollo/client';

export const GET_USERS = gql`
  {
    users {
      name
      rocket
      id
    }
  }
`;
export const DELETE_USER = gql`
  mutation ($id: uuid) {
    delete_users(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;
export const UPDATE_USER = gql`
  mutation ($name: String, $rocket: String, $id: uuid) {
    update_users(
      where: { id: { _eq: $id } }
      _set: { name: $name, rocket: $rocket }
    ) {
      returning {
        name
        rocket
      }
    }
  }
`;
export const INSERT_USER = gql`
  mutation ($name: String, $id: uuid, $rocket: String) {
    insert_users(objects: { name: $name, rocket: $rocket, id: $id }) {
      returning {
        id
        name
        rocket
      }
      affected_rows
    }
  }
`;
