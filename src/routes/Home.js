import React from 'react';
import { Query } from 'react-apollo';
import {ALL_USERS} from "../queries";

const Home = () => (
    <Query query={ALL_USERS}>
        {({ data, loading, error }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            return (
                <div>
                    {data.allUsers.map(({id, email}) => (
                        <h1>{id} {email}</h1>
                    ))}
                </div>
            );
        }}
    </Query>
);



export default Home;
