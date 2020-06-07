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
        register(username: $username, email: $email, password: $password) {
            ok
            errors {
                path 
                message
            }
        }
    }
`;

export const USER_LOGIN = gql`
    mutation ($email: String!, $password: String!){
        login(email: $email, password: $password) {
            ok
            token
            refreshToken
            errors {
                path
                message
            }
        }
    }
`;

export const NEW_TEAM = gql`
    mutation($name: String!) {
        createTeam(name: $name) {
            ok
            errors {
                path
                message
            }
        }
    }
`;

export const NEW_CHANNEL = gql`
    mutation($teamId: Int!, $name: String!) {
        createChannel(teamId: $teamId, name: $name) {
            ok
            channel {
                id
                name
                teamId
            }
        }
    }
`;

export const USER_TEAMS = gql`
    query {
        allTeams {
            id
            name
            channels {
                id
                name
                public
                teamId
            }
        }
    }
`;

/* USER QUERIES */
export const GET_CURRENT_USER = gql`
    query {
        getCurrentUser {
            id
            email
            username
        }
    }
`;
