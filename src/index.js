import React from 'react';
import {render} from 'react-dom';
import ApolloClient from 'apollo-boost';
import Routes from './routes'
import {ApolloProvider} from '@apollo/react-hooks';
import 'semantic-ui-css/semantic.css';

const client = new ApolloClient({
    uri: 'http://localhost:4000',
});


const App = (
    <ApolloProvider client={client}>
        <Routes/>
    </ApolloProvider>
);

render(App, document.getElementById('root'));
