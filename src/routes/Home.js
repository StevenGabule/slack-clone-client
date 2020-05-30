import React from 'react';
import {Query} from 'react-apollo';
import {ALL_USERS} from "../queries";
import {Link} from "react-router-dom";
import {Button, Container} from "semantic-ui-react";

const Home = () => (
    <Query query={ALL_USERS}>
        {({data, loading, error}) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            return (
                <Container text style={{marginTop: '5%'}}>
                    <Button type='button' color={'red'}>
                        <Link to={'/login'} style={{color: 'white'}}>Login</Link>
                    </Button>
                    <Button type='button' color={'teal'}>
                    <Link to={'/register'} style={{color: 'white'}}>Register</Link>
                    </Button>
                    <Button type='button' primary>
                        <Link to={'/create-team'} style={{color: 'white'}}>Create Team</Link>
                    </Button>
                    {data.allUsers.map(({id, email}) => (
                        <h1 key={id}>{email}</h1>
                    ))}
                </Container>
            );
        }}
    </Query>
);


export default Home;
