import React from 'react';
import {render} from 'react-dom';
import ApolloClient from 'apollo-boost';
import withSession from './auth/WithSession';
import Root from './routes'
import {ApolloProvider} from '@apollo/react-hooks';
import 'semantic-ui-css/semantic.css';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    fetchOptions: {
        credentials: 'include'
    },
    request: operation => {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');
        operation.setContext({
            headers: {
                'token': token,
                'refresh-token': refreshToken
            }
        })
    },
    onError: ({networkError}) => {
        if (networkError) {
            console.log('Network Error ', networkError);
        }
    }
});

const RootWithSession = withSession(Root);

const App = (
    <ApolloProvider client={client}>
        <RootWithSession/>
    </ApolloProvider>
);

render(App, document.getElementById('root'));
