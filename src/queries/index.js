import gql from "graphql-tag";

export const ALL_USERS = gql`
    {
        allUsers {
            id
            email
        }
    }
`;

export const USER_REGISTER = gql`
    mutation($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password)
    }
`;
