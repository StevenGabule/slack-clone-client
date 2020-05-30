import React from 'react';
import {render} from 'react-dom';
import ApolloClient from 'apollo-boost';
import Routes from './routes'
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
                'x-refresh-token': refreshToken
            }
        })
    },
    onError: ({networkError}) => {
        if (networkError) {
            console.log('Network Error ', networkError);
        }
    }
});


const App = (
    <ApolloProvider client={client}>
        <Routes/>
    </ApolloProvider>
);

render(App, document.getElementById('root'));
