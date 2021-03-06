import React from 'react';
import {Query} from 'react-apollo'
import {GET_CURRENT_USER} from "../queries";
const WithSession = Component => props => (
    <Query query={GET_CURRENT_USER}>
        {({data, loading, refetch, error}) => {
            if (loading) return null;
            return (
                <Component
                    session={data}
                    {...props}
                    refetch={refetch} />
            )
        }}
    </Query>
);

export default WithSession;
